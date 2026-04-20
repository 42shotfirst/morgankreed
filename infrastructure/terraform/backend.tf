# TODO: Uncomment the backend block below after creating the S3 bucket and
# DynamoDB table for Terraform state management. You can create these resources
# manually or with a separate bootstrap Terraform configuration.
#
# Required resources:
#   1. S3 bucket for state storage (enable versioning)
#   2. DynamoDB table for state locking (partition key: "LockID", type: String)
#
# After creating the resources, uncomment the block, fill in the values,
# and run `terraform init` to migrate local state to the remote backend.
#
# terraform {
#   backend "s3" {
#     bucket         = "your-terraform-state-bucket"
#     key            = "morgankreed/terraform.tfstate"
#     region         = "us-east-1"
#     dynamodb_table = "terraform-state-lock"
#     encrypt        = true
#   }
# }
