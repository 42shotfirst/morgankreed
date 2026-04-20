output "certificate_arn" {
  description = "ARN of the ACM certificate"
  value       = aws_acm_certificate.site.arn
}

output "validation_records" {
  description = "DNS validation records that must be created to validate the certificate"
  value = {
    for dvo in aws_acm_certificate.site.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }
}
