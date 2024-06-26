variable "aws_region" {
  description = "The AWS region to create resources in."
  default     = "us-east-1"
}

variable "ami_id" {
  description = "The AMI ID to use for the EC2 instances."
}

variable "instance_type" {
  description = "The instance type to use for the EC2 instances."
  default     = "t2.micro"
}

variable "access_key" {
  description = "The AWS access key."
}

variable "secret_key" {
  description = "The AWS secret key."
}
