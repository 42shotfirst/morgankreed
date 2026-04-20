variable "domain_name" {
  description = "Root hosted zone domain (e.g. morgankreed.com). An existing Route53 hosted zone must exist for this domain."
  type        = string
}

variable "alias_records" {
  description = "List of DNS names to create A/AAAA alias records for (e.g. [\"morgankreed.com\", \"www.morgankreed.com\"] or [\"staging.morgankreed.com\"])"
  type        = list(string)
  default     = []
}

variable "cloudfront_distribution_domain_name" {
  description = "Domain name of the CloudFront distribution to alias"
  type        = string
}

variable "cloudfront_distribution_hosted_zone_id" {
  description = "Route53 hosted zone ID for the CloudFront distribution (always Z2FDTNDATAQYW2)"
  type        = string
}

variable "acm_domain_validation_options" {
  description = "Domain validation options from the ACM certificate"
  type = list(object({
    domain_name           = string
    resource_record_name  = string
    resource_record_type  = string
    resource_record_value = string
  }))
  default = []
}
