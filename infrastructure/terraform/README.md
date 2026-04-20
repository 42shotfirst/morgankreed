# Terraform Infrastructure

Infrastructure-as-code for hosting the morgankreed portfolio site on AWS S3 + CloudFront.

## Architecture

- **S3** - Static site bucket with versioning, all public access blocked
- **CloudFront** - CDN distribution with Origin Access Control (OAC), HTTPS redirect, SPA error handling
- **ACM** - TLS certificate with DNS validation (domain + wildcard)
- **IAM** - Least-privilege deploy user for GitHub Actions CI/CD

## Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/install) >= 1.5
- AWS CLI configured with appropriate credentials
- A registered domain name (for custom domain setup)

## Variables

| Name | Description | Default | Required |
|------|-------------|---------|----------|
| `project_name` | Prefix for all resource names | - | yes |
| `domain_name` | Primary domain (e.g. `example.com`) | - | yes |
| `environment` | Deployment environment | `production` | no |
| `aws_region` | AWS region | `us-east-1` | no |

## Usage

```bash
# Initialize Terraform
terraform init

# Preview changes
terraform plan -var="project_name=morgankreed" -var="domain_name=example.com"

# Apply infrastructure
terraform apply -var="project_name=morgankreed" -var="domain_name=example.com"
```

Alternatively, create a `terraform.tfvars` file:

```hcl
project_name = "morgankreed"
domain_name  = "example.com"
environment  = "production"
aws_region   = "us-east-1"
```

Then run:

```bash
terraform plan
terraform apply
```

## Remote State

The `backend.tf` file contains a commented-out S3 backend configuration. To enable remote state:

1. Create an S3 bucket for state storage (with versioning enabled)
2. Create a DynamoDB table for state locking (partition key: `LockID`)
3. Uncomment and update the backend block in `backend.tf`
4. Run `terraform init` to migrate state

## Post-Apply Steps

1. **DNS Validation** - Create the DNS records output by `terraform output` to validate the ACM certificate
2. **DNS Routing** - Point your domain to the CloudFront distribution domain name via CNAME or alias record
3. **GitHub Secrets** - Store the deploy user credentials as repository secrets:
   - `AWS_ACCESS_KEY_ID` = `terraform output -raw deploy_access_key_id`
   - `AWS_SECRET_ACCESS_KEY` = `terraform output -raw deploy_secret_access_key`

## Modules

| Module | Description |
|--------|-------------|
| `modules/s3-site` | S3 bucket with versioning and CloudFront-only access policy |
| `modules/cloudfront` | CloudFront distribution with OAC, HTTPS, and SPA error handling |
| `modules/acm` | ACM certificate with DNS validation and wildcard SAN |
| `modules/iam-deploy` | IAM user with least-privilege S3 and CloudFront permissions |
