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

output "deploy_access_key_id" {
  description = "Access key ID for the CI/CD deploy user"
  value       = module.iam_deploy.access_key_id
  sensitive   = true
}

output "deploy_secret_access_key" {
  description = "Secret access key for the CI/CD deploy user"
  value       = module.iam_deploy.secret_access_key
  sensitive   = true
}

output "route53_zone_id" {
  description = "Route53 hosted zone ID (empty if no domain configured)"
  value       = length(module.route53) > 0 ? module.route53[0].zone_id : ""
}

output "acm_certificate_arn" {
  description = "ARN of the ACM certificate (empty if no domain configured)"
  value       = length(module.acm) > 0 ? module.acm[0].certificate_arn : ""
}
