resource "aws_iam_user" "deploy" {
  name = var.deploy_user_name
  path = "/ci/"
}

data "aws_iam_policy_document" "deploy" {
  # S3 object-level permissions
  statement {
    sid    = "S3ObjectAccess"
    effect = "Allow"

    actions = [
      "s3:PutObject",
      "s3:DeleteObject",
    ]

    resources = ["${var.s3_bucket_arn}/*"]
  }

  # S3 bucket-level permissions
  statement {
    sid    = "S3BucketList"
    effect = "Allow"

    actions = [
      "s3:ListBucket",
    ]

    resources = [var.s3_bucket_arn]
  }

  # CloudFront cache invalidation
  statement {
    sid    = "CloudFrontInvalidation"
    effect = "Allow"

    actions = [
      "cloudfront:CreateInvalidation",
    ]

    resources = [var.cloudfront_distribution_arn]
  }
}

resource "aws_iam_user_policy" "deploy" {
  name   = "${var.deploy_user_name}-policy"
  user   = aws_iam_user.deploy.name
  policy = data.aws_iam_policy_document.deploy.json
}

resource "aws_iam_access_key" "deploy" {
  user = aws_iam_user.deploy.name
}
