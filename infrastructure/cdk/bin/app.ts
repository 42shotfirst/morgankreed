#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ContentEngineStack } from "../lib/content-engine-stack";

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION ?? "us-east-1",
};

new ContentEngineStack(app, "CtoOnDemandContentEngine", {
  env,
  adminEmail: process.env.ADMIN_EMAIL ?? "morgan.reed@ctoondemandinc.com",
  corsOrigins: [
    "https://morgankreed.com",
    "https://www.morgankreed.com",
    "https://ctoondemandinc.com",
    "https://www.ctoondemandinc.com",
    // dev origin — remove before going live if you want production lockdown
    "http://localhost:5173",
  ],
});
