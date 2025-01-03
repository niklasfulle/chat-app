# Configure the Virtual Private Cloud (VPC)
resource "aws_vpc" "my_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support  = true

  tags = {
    # Name tag for the VPC
    Name = "ec2_vpc"
  }
}

# Configure a Public Subnet within the VPC
resource "aws_subnet" "my_public_subnet" {
  vpc_id               = aws_vpc.my_vpc.id
  cidr_block           = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone    = "eu-central-1a"

  tags = {
    # Name tag for the public subnet
    Name = "dev-public"
  }
}

# Configure the Internet Gateway for the VPC
resource "aws_internet_gateway" "my_internet_gateway" {
  vpc_id = aws_vpc.my_vpc.id

  tags = {
    # Name tag for the internet gateway
    Name = "dev-igw"
  }
}

# Configure the Public Route Table for the VPC
resource "aws_route_table" "my_public_rt" {
  vpc_id = aws_vpc.my_vpc.id

  tags = {
    # Name tag for the public route table
    Name = "dev_public_rt"
  }
}

# Configure a Default Route in the Public Route Table
resource "aws_route" "default_route" {
  route_table_id         = aws_route_table.my_public_rt.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.my_internet_gateway.id
}

# Associate the Public Subnet with the Public Route Table
resource "aws_route_table_association" "my_public_assoc" {
  subnet_id      = aws_subnet.my_public_subnet.id
  route_table_id = aws_route_table.my_public_rt.id
}


# Create EC2 Security Group and Security Rules
resource "aws_security_group" "my_sg" {
  name        = "dev_sg"
  description = "dev security group"
  vpc_id      = aws_vpc.my_vpc.id

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


# Create SSH Keys for EC2 Remote Access
resource "tls_private_key" "public_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

variable "web_tier_EC2_rsa_key" {
  default     = "web_tier_EC2_rsa_key"
  description = "RSA Key variable"
  type        = string
}

resource "aws_key_pair" "web_tier_EC2_rsa_key" {
  key_name   = var.web_tier_EC2_rsa_key
  public_key = tls_private_key.public_key.public_key_openssh
}


# Create EC2 Instance
resource "aws_instance" "ec2_dev" {
  instance_type          = "t2.micro"
  ami                    = data.aws_ami.server_ami.id
  vpc_security_group_ids = [aws_security_group.my_sg.id]
  subnet_id              = aws_subnet.my_public_subnet.id
  key_name               = "web_tier_EC2_rsa_key"
  user_data              = file("install.sh")

  root_block_device {
    volume_size = 20
  }
  tags = {
    Name = "server"
  }
}
