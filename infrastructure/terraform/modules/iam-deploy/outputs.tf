output "deploy_user_arn" {
  description = "ARN of the IAM deploy user"
  value       = aws_iam_user.deploy.arn
}

output "access_key_id" {
  description = "Access key ID for the deploy user"
  value       = aws_iam_access_key.deploy.id
  sensitive   = true
}

output "secret_access_key" {
  description = "Secret access key for the deploy user"
  value       = aws_iam_access_key.deploy.secret
  sensitive   = true
}
