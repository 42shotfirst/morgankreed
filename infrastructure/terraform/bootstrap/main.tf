# -----------------------------------------------------------------------------
# Bootstrap — Terraform State Infrastructure
#
# Run this once manually to create the S3 bucket and DynamoDB table used by
# the main Terraform configuration's remote backend.
#
#   cd infrastructure/terraform/bootstrap
#   terraform init
#   terraform apply
#
# After this succeeds, uncomment the backend block in ../backend.tf and run
# `terraform init` in the parent directory to migrate state.
# -----------------------------------------------------------------------------

terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project   = "morgankreed"
      ManagedBy = "terraform-bootstrap"
    }
  }
}

variable "aws_region" {
  description = "AWS region for state resources"
  type        = string
  default     = "us-east-1"
}

variable "state_bucket_name" {
  description = "Name of the S3 bucket for Terraform state"
  type        = string
  default     = "morgankreed-terraform-state"
}

variable "lock_table_name" {
  description = "Name of the DynamoDB table for state locking"
  type        = string
  default     = "morgankreed-terraform-lock"
}

# -----------------------------------------------------------------------------
# S3 Bucket — state storage
# -----------------------------------------------------------------------------
resource "aws_s3_bucket" "state" {
  bucket = var.state_bucket_name

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "state" {
  bucket = aws_s3_bucket.state.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "state" {
  bucket = aws_s3_bucket.state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "aws:kms"
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_public_access_block" "state" {
  bucket = aws_s3_bucket.state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# -----------------------------------------------------------------------------
# DynamoDB Table — state locking
# -----------------------------------------------------------------------------
resource "aws_dynamodb_table" "lock" {
  name         = var.lock_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}

# -----------------------------------------------------------------------------
# Outputs
# -----------------------------------------------------------------------------
output "state_bucket_name" {
  description = "S3 bucket name for Terraform state — use in backend.tf"
  value       = aws_s3_bucket.state.id
}

output "lock_table_name" {
  description = "DynamoDB table name for state locking — use in backend.tf"
  value       = aws_dynamodb_table.lock.name
}
