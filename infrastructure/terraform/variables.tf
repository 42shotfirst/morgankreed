variable "project_name" {
  description = "Name of the project, used as a prefix for resource naming"
  type        = string
}

variable "domain_name" {
  description = "Primary domain name for the site (e.g. example.com)"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"

  validation {
    condition     = contains(["production", "staging", "development"], var.environment)
    error_message = "Environment must be one of: production, staging, development."
  }
}

variable "aws_region" {
  description = "AWS region for resource deployment"
  type        = string
  default     = "us-east-1"
}
