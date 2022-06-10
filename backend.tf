resource "aws_s3_bucket" "terraform_backend_bucket" {
      bucket = "terraform-state-b8er8si0k2du2h1i5dep3xcklp0x0je0rqjpk6ljtpn32"
}

terraform {
  required_providers {
    aws =  {
    source = "hashicorp/aws"
    version = ">= 2.7.0"
    }
  }
}

