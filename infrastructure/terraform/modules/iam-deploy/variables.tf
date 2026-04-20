variable "s3_bucket_arn" {
  description = "ARN of the S3 bucket the deploy user needs access to"
  type        = string
}

variable "cloudfront_distribution_arn" {
  description = "ARN of the CloudFront distribution for cache invalidation"
  type        = string
}

variable "deploy_user_name" {
  description = "Name for the IAM deploy user"
  type        = string
}
