# This data source retrieves the most recent Ubuntu 20.04 (Focal Fossa) AMI from AWS Marketplace
data "aws_ami" "server_ami" {

  most_recent = true
  owners = ["099720109477"]

  filter {
    name = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}