# This block defines the required Terraform providers for this configuration
terraform {
  required_providers {
    # defines the AWS provider
    aws = {
      # This argument specifies the source of the AWS provider plugin
      source  = "hashicorp/aws"
      # This argument specifies the required version constraint for the AWS provider
      version = "~> 5.0"
    }
  }
}

# configures the AWS provider
provider "aws" {
  # specifies the AWS region to use
  region = "eu-west-2"
}