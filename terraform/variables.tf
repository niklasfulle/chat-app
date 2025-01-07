variable "region" {
  type        = string
  description = "AWS region in which the resources are created"
  default     = "eu-west-2"
}

variable "instance_type" {
  type        = string
  description = "Type of the EC2 instance"
  default     = "t2.micro"
}

variable "ami" {
  type        = string
  description = "AMI ID of the Amazon Machine Image"
  default     = "ami-05c172c7f0d3aed00"
}

variable "my_aws_key2" {
  default     = "my_aws2"
  description = "RSA Key variable"
  type        = string
}