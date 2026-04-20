# -----------------------------------------------------------------------------
# Route53 DNS — alias records and ACM validation
# Expects an existing hosted zone for the domain.
# -----------------------------------------------------------------------------

data "aws_route53_zone" "main" {
  name         = var.domain_name
  private_zone = false
}

# -----------------------------------------------------------------------------
# Alias records → CloudFront (A + AAAA for each name)
# -----------------------------------------------------------------------------
resource "aws_route53_record" "alias_a" {
  for_each = toset(var.alias_records)

  zone_id = data.aws_route53_zone.main.zone_id
  name    = each.value
  type    = "A"

  alias {
    name                   = var.cloudfront_distribution_domain_name
    zone_id                = var.cloudfront_distribution_hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "alias_aaaa" {
  for_each = toset(var.alias_records)

  zone_id = data.aws_route53_zone.main.zone_id
  name    = each.value
  type    = "AAAA"

  alias {
    name                   = var.cloudfront_distribution_domain_name
    zone_id                = var.cloudfront_distribution_hosted_zone_id
    evaluate_target_health = false
  }
}

# -----------------------------------------------------------------------------
# ACM DNS validation records
# -----------------------------------------------------------------------------
resource "aws_route53_record" "acm_validation" {
  for_each = {
    for dvo in var.acm_domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  zone_id         = data.aws_route53_zone.main.zone_id
  name            = each.value.name
  type            = each.value.type
  ttl             = 300
  records         = [each.value.record]
  allow_overwrite = true
}
