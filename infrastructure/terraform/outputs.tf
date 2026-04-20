output "bucket_name" {
  description = "Name of the S3 bucket hosting the static site"
  value       = module.s3_site.bucket_id
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = module.cloudfront.distribution_id
}

output "cloudfront_domain" {
  description = "Domain name of the CloudFront distribution"
  value       = module.cloudfront.distribution_domain_name
}

output "deploy_user_arn" {
  description = "ARN of the IAM deploy user for CI/CD"
  value       = module.iam_deploy.deploy_user_arn
}
