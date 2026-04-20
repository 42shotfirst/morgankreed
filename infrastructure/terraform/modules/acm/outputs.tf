output "certificate_arn" {
  description = "ARN of the validated ACM certificate (empty string if no domain)"
  value       = length(aws_acm_certificate.site) > 0 ? aws_acm_certificate.site[0].arn : ""
}

output "domain_validation_options" {
  description = "Domain validation options for creating DNS records"
  value = length(aws_acm_certificate.site) > 0 ? [
    for dvo in aws_acm_certificate.site[0].domain_validation_options : {
      domain_name           = dvo.domain_name
      resource_record_name  = dvo.resource_record_name
      resource_record_type  = dvo.resource_record_type
      resource_record_value = dvo.resource_record_value
    }
  ] : []
}
