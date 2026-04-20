import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as iam from "aws-cdk-lib/aws-iam";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as path from "path";

export interface ContentEngineStackProps extends cdk.StackProps {
  adminEmail: string;
  corsOrigins: string[];
}

export class ContentEngineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ContentEngineStackProps) {
    super(scope, id, props);

    // ------------------------------------------------------------------
    // DynamoDB: content-engine-posts
    // ------------------------------------------------------------------
    const postsTable = new dynamodb.Table(this, "PostsTable", {
      tableName: "content-engine-posts",
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "sk", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      // Protect against accidental teardown. Remove if you want `cdk destroy`
      // to drop the table (and all posts with it).
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      pointInTimeRecovery: true,
    });

    postsTable.addGlobalSecondaryIndex({
      indexName: "status-updatedAt-index",
      partitionKey: { name: "status", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "updatedAt", type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    // ------------------------------------------------------------------
    // Secrets Manager: Claude API key
    // The secret VALUE is NOT set by CDK. After `cdk deploy`, run:
    //   aws secretsmanager put-secret-value \
    //     --secret-id /cto-on-demand/claude-api-key \
    //     --secret-string 'sk-ant-...'
    // ------------------------------------------------------------------
    const claudeSecret = new secretsmanager.Secret(this, "ClaudeApiKey", {
      secretName: "/cto-on-demand/claude-api-key",
      description: "Anthropic API key for content-generate Lambda",
    });

    // ------------------------------------------------------------------
    // Cognito: User Pool + App Client
    // Single-admin pool. No self-signup. TOTP MFA required. Admin-created user.
    // ------------------------------------------------------------------
    const userPool = new cognito.UserPool(this, "AdminPool", {
      userPoolName: "cto-on-demand-admin",
      selfSignUpEnabled: false,
      signInAliases: { email: true },
      autoVerify: { email: true },
      standardAttributes: {
        email: { required: true, mutable: false },
      },
      passwordPolicy: {
        minLength: 14,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      mfa: cognito.Mfa.REQUIRED,
      mfaSecondFactor: { sms: false, otp: true },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const userPoolClient = new cognito.UserPoolClient(this, "AdminPoolClient", {
      userPool,
      userPoolClientName: "cto-on-demand-admin-web",
      generateSecret: false, // browser client
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      preventUserExistenceErrors: true,
      enableTokenRevocation: true,
      accessTokenValidity: cdk.Duration.hours(1),
      idTokenValidity: cdk.Duration.hours(1),
      refreshTokenValidity: cdk.Duration.days(30),
    });

    // Pre-create the admin user. Cognito emails them a temporary password on
    // first creation. They must change it on first sign-in, then set up TOTP.
    new cognito.CfnUserPoolUser(this, "AdminUser", {
      userPoolId: userPool.userPoolId,
      username: props.adminEmail,
      desiredDeliveryMediums: ["EMAIL"],
      userAttributes: [
        { name: "email", value: props.adminEmail },
        { name: "email_verified", value: "true" },
      ],
    });

    // ------------------------------------------------------------------
    // Lambdas
    // ------------------------------------------------------------------
    // Monorepo root contains package.json / package-lock.json and is the
    // ancestor for all Lambda source dirs in infrastructure/lambda/*.
    const MONOREPO_ROOT = path.join(__dirname, "..", "..", "..");
    const LAMBDA_DIR = path.join(MONOREPO_ROOT, "infrastructure", "lambda");

    const lambdaCommon: Partial<lambdaNode.NodejsFunctionProps> = {
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      tracing: lambda.Tracing.ACTIVE,
      projectRoot: MONOREPO_ROOT,
      depsLockFilePath: path.join(MONOREPO_ROOT, "package-lock.json"),
      environment: {
        DYNAMO_TABLE: postsTable.tableName,
        NODE_OPTIONS: "--enable-source-maps",
      },
      bundling: {
        minify: true,
        sourceMap: true,
        target: "node20",
        externalModules: ["@aws-sdk/*"], // provided by runtime
      },
    };

    // blog-list-public — public GET for the blog
    const blogListFn = new lambdaNode.NodejsFunction(this, "BlogListFn", {
      ...lambdaCommon,
      functionName: "blog-list-public",
      entry: path.join(LAMBDA_DIR, "blog-list-public", "index.ts"),
      handler: "handler",
    });
    postsTable.grantReadData(blogListFn);

    // content-generate — authenticated, calls Claude
    const contentGenerateFn = new lambdaNode.NodejsFunction(
      this,
      "ContentGenerateFn",
      {
        ...lambdaCommon,
        functionName: "content-generate",
        entry: path.join(LAMBDA_DIR, "content-generate", "index.ts"),
        handler: "handler",
        timeout: cdk.Duration.seconds(60),
        memorySize: 1024,
        environment: {
          ...lambdaCommon.environment!,
          CLAUDE_API_KEY_SECRET_ARN: claudeSecret.secretArn,
          CLAUDE_MODEL: "claude-sonnet-4-6",
        },
        bundling: {
          ...lambdaCommon.bundling!,
          externalModules: ["@aws-sdk/*"],
          // prompts are read at runtime from the bundle. inputDir is the
          // projectRoot (monorepo root) so we reference the absolute path
          // of the prompts directory.
          commandHooks: {
            beforeBundling: () => [],
            afterBundling: (_inputDir: string, outputDir: string) => [
              `cp -r ${path.join(
                LAMBDA_DIR,
                "content-generate",
                "prompts"
              )} ${outputDir}/`,
            ],
            beforeInstall: () => [],
          },
        },
      }
    );
    claudeSecret.grantRead(contentGenerateFn);

    // save-draft — authenticated, writes a draft to DynamoDB
    const saveDraftFn = new lambdaNode.NodejsFunction(this, "SaveDraftFn", {
      ...lambdaCommon,
      functionName: "save-draft",
      entry: path.join(LAMBDA_DIR, "save-draft", "index.ts"),
      handler: "handler",
    });
    postsTable.grantReadWriteData(saveDraftFn);

    // ------------------------------------------------------------------
    // API Gateway
    // ------------------------------------------------------------------
    const api = new apigateway.RestApi(this, "Api", {
      restApiName: "cto-on-demand-api",
      deployOptions: {
        stageName: "prod",
        throttlingBurstLimit: 100,
        throttlingRateLimit: 50,
      },
      defaultCorsPreflightOptions: {
        allowOrigins: props.corsOrigins,
        allowMethods: ["GET", "POST", "OPTIONS"],
        allowHeaders: [
          "Content-Type",
          "Authorization",
          "X-Amz-Date",
          "X-Api-Key",
          "X-Amz-Security-Token",
        ],
        allowCredentials: false,
      },
    });

    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(
      this,
      "Authorizer",
      {
        cognitoUserPools: [userPool],
        identitySource: "method.request.header.Authorization",
      }
    );

    // --- Public routes ---
    const apiRoot = api.root.addResource("api");
    const blog = apiRoot.addResource("blog");
    const blogPosts = blog.addResource("posts");
    blogPosts.addMethod("GET", new apigateway.LambdaIntegration(blogListFn));

    // --- Authenticated routes ---
    const content = apiRoot.addResource("content");
    const generate = content.addResource("generate");
    generate.addMethod(
      "POST",
      new apigateway.LambdaIntegration(contentGenerateFn),
      {
        authorizer,
        authorizationType: apigateway.AuthorizationType.COGNITO,
      }
    );

    const posts = content.addResource("posts");
    posts.addMethod("POST", new apigateway.LambdaIntegration(saveDraftFn), {
      authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO,
    });

    // ------------------------------------------------------------------
    // Outputs — used by the frontend .env
    // ------------------------------------------------------------------
    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
      description: "Base URL for the CTO on Demand API",
    });
    new cdk.CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
      description: "VITE_COGNITO_USER_POOL_ID",
    });
    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
      description: "VITE_COGNITO_CLIENT_ID",
    });
    new cdk.CfnOutput(this, "Region", {
      value: this.region,
      description: "VITE_COGNITO_REGION / VITE_AWS_REGION",
    });
    new cdk.CfnOutput(this, "AdminEmail", {
      value: props.adminEmail,
      description: "Pre-created admin user email",
    });
  }
}
