output "zone_id" {
  description = "Route53 hosted zone ID"
  value       = data.aws_route53_zone.main.zone_id
}

output "name_servers" {
  description = "Name servers for the hosted zone"
  value       = data.aws_route53_zone.main.name_servers
}

output "acm_validation_record_fqdns" {
  description = "FQDNs of the ACM validation records (used by aws_acm_certificate_validation)"
  value       = [for r in aws_route53_record.acm_validation : r.fqdn]
}
