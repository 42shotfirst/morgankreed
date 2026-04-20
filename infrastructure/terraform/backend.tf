# Remote backend — S3 + DynamoDB state locking.
#
# Prerequisites:
#   1. Run `terraform apply` in the bootstrap/ directory first.
#   2. Uncomment the block below and run `terraform init` to migrate state.
#
# Workspaces: Terraform workspaces automatically namespace the state key,
# so staging and production each get their own state file under env:/.
#
# terraform {
#   backend "s3" {
#     bucket         = "morgankreed-terraform-state"
#     key            = "morgankreed/terraform.tfstate"
#     region         = "us-east-1"
#     dynamodb_table = "morgankreed-terraform-lock"
#     encrypt        = true
#   }
# }
