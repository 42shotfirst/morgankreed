variable "s3_bucket_regional_domain_name" {
  description = "Regional domain name of the S3 origin bucket"
  type        = string
}

variable "s3_bucket_id" {
  description = "ID (name) of the S3 origin bucket"
  type        = string
}

variable "domain_aliases" {
  description = "Custom domain aliases for the distribution (e.g. [\"example.com\", \"www.example.com\"])"
  type        = list(string)
  default     = []
}

variable "acm_certificate_arn" {
  description = "ARN of the ACM certificate for custom domain HTTPS. Required when domain_aliases is non-empty."
  type        = string
  default     = ""
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
}
