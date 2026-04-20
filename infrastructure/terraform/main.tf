# -----------------------------------------------------------------------------
# Local values
# -----------------------------------------------------------------------------
locals {
  has_domain = var.domain_name != ""

  # For subdomains like staging.morgankreed.com, only alias the exact name.
  # For apex domains like morgankreed.com, alias both apex and www.
  is_apex        = local.has_domain ? length(split(".", var.domain_name)) == 2 : false
  domain_aliases = local.has_domain ? (local.is_apex ? [var.domain_name, "www.${var.domain_name}"] : [var.domain_name]) : []

  # The hosted zone is always the apex domain (last two labels).
  hosted_zone_domain = local.has_domain ? join(".", slice(split(".", var.domain_name), length(split(".", var.domain_name)) - 2, length(split(".", var.domain_name)))) : ""
}

# -----------------------------------------------------------------------------
# S3 Static Site Bucket
# -----------------------------------------------------------------------------
module "s3_site" {
  source = "./modules/s3-site"

  bucket_name = "${var.project_name}-${var.environment}-site"
}

# -----------------------------------------------------------------------------
# ACM Certificate (DNS-validated, us-east-1 required for CloudFront)
# Skipped when domain_name is empty.
# -----------------------------------------------------------------------------
module "acm" {
  source = "./modules/acm"
  count  = local.has_domain ? 1 : 0

  domain_name = var.domain_name
}

# -----------------------------------------------------------------------------
# CloudFront Distribution (uses S3 bucket as origin via OAC)
# -----------------------------------------------------------------------------
module "cloudfront" {
  source = "./modules/cloudfront"

  s3_bucket_regional_domain_name = module.s3_site.bucket_regional_domain_name
  s3_bucket_id                   = module.s3_site.bucket_id
  domain_aliases                 = local.domain_aliases
  acm_certificate_arn            = local.has_domain ? module.acm[0].certificate_arn : ""
  project_name                   = var.project_name
  environment                    = var.environment
}

# -----------------------------------------------------------------------------
# S3 Bucket Policy (grants CloudFront OAC read access)
# Defined at root level to avoid circular dependency between S3 and CloudFront.
# -----------------------------------------------------------------------------
data "aws_iam_policy_document" "cloudfront_oac_access" {
  statement {
    sid    = "AllowCloudFrontServicePrincipalRead"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions   = ["s3:GetObject"]
    resources = ["${module.s3_site.bucket_arn}/*"]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [module.cloudfront.distribution_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = module.s3_site.bucket_id
  policy = data.aws_iam_policy_document.cloudfront_oac_access.json
}

# -----------------------------------------------------------------------------
# Route53 DNS (alias records + ACM validation)
# Skipped when domain_name is empty.
# -----------------------------------------------------------------------------
module "route53" {
  source = "./modules/route53"
  count  = local.has_domain ? 1 : 0

  domain_name                            = local.hosted_zone_domain
  alias_records                          = local.domain_aliases
  cloudfront_distribution_domain_name    = module.cloudfront.distribution_domain_name
  cloudfront_distribution_hosted_zone_id = module.cloudfront.distribution_hosted_zone_id
  acm_domain_validation_options          = module.acm[0].domain_validation_options
}

# -----------------------------------------------------------------------------
# ACM Certificate Validation (waits for Route53 DNS records to propagate)
# Defined at root level to avoid circular dependency between ACM and Route53.
# -----------------------------------------------------------------------------
resource "aws_acm_certificate_validation" "site" {
  count = local.has_domain ? 1 : 0

  certificate_arn         = module.acm[0].certificate_arn
  validation_record_fqdns = module.route53[0].acm_validation_record_fqdns
}

# -----------------------------------------------------------------------------
# IAM Deploy User (for GitHub Actions CI/CD)
# -----------------------------------------------------------------------------
module "iam_deploy" {
  source = "./modules/iam-deploy"

  s3_bucket_arn               = module.s3_site.bucket_arn
  cloudfront_distribution_arn = module.cloudfront.distribution_arn
  deploy_user_name            = "${var.project_name}-${var.environment}-deploy"
}
