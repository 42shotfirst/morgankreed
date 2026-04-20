# -----------------------------------------------------------------------------
# S3 Static Site Bucket
# -----------------------------------------------------------------------------
module "s3_site" {
  source = "./modules/s3-site"

  bucket_name = "${var.project_name}-${var.environment}-site"
}

# -----------------------------------------------------------------------------
# CloudFront Distribution (uses S3 bucket as origin via OAC)
# -----------------------------------------------------------------------------
module "cloudfront" {
  source = "./modules/cloudfront"

  s3_bucket_regional_domain_name = module.s3_site.bucket_regional_domain_name
  s3_bucket_id                   = module.s3_site.bucket_id
  domain_aliases                 = var.domain_name != "" ? [var.domain_name, "www.${var.domain_name}"] : []
  acm_certificate_arn            = var.domain_name != "" ? module.acm.certificate_arn : ""
  project_name                   = var.project_name
}

# -----------------------------------------------------------------------------
# S3 Bucket Policy (grants CloudFront OAC read access)
# Defined at root level to avoid circular dependency between S3 and CloudFront
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
# ACM Certificate (DNS-validated)
# -----------------------------------------------------------------------------
module "acm" {
  source = "./modules/acm"

  domain_name = var.domain_name
}

# -----------------------------------------------------------------------------
# IAM Deploy User (for GitHub Actions CI/CD)
# -----------------------------------------------------------------------------
module "iam_deploy" {
  source = "./modules/iam-deploy"

  s3_bucket_arn               = module.s3_site.bucket_arn
  cloudfront_distribution_arn = module.cloudfront.distribution_arn
  deploy_user_name            = "${var.project_name}-deploy"
}
