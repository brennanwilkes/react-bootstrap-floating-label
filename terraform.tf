terraform {
  backend "s3" {
      bucket = "terraform-state-b8er8si0k2du2h1i5dep3xcklp0x0je0rqjpk6ljtpn32"
      key = "terraform/state"
      region = "us-west-2"
  }
}

provider "aws" {
    region = "us-west-2"
}

resource "aws_instance" "Instance-pkep" {
      ami = data.aws_ami.ubuntu_latest.id
      instance_type = "t2.micro"
      lifecycle {
        ignore_changes = [ami]
      }
}

resource "aws_iam_user" "Instance-pkep_iam" {
      name = "Instance-pkep_iam"
}

resource "aws_iam_user_policy_attachment" "Instance-pkep_iam_policy_attachment0" {
      user = aws_iam_user.Instance-pkep_iam.name
      policy_arn = aws_iam_policy.Instance-pkep_iam_policy0.arn
}

resource "aws_iam_policy" "Instance-pkep_iam_policy0" {
      name = "Instance-pkep_iam_policy0"
      path = "/"
      policy = data.aws_iam_policy_document.Instance-pkep_iam_policy_document.json
}

resource "aws_iam_access_key" "Instance-pkep_iam_access_key" {
      user = aws_iam_user.Instance-pkep_iam.name
}

data "aws_iam_policy_document" "Instance-pkep_iam_policy_document" {
      statement {
        actions = ["ec2:RunInstances", "ec2:AssociateIamInstanceProfile", "ec2:ReplaceIamInstanceProfileAssociation"]
        effect = "Allow"
        resources = ["arn:aws:ec2:::*"]
      }
      statement {
        actions = ["iam:PassRole"]
        effect = "Allow"
        resources = [aws_instance.Instance-pkep.arn]
      }
}

data "aws_ami" "ubuntu_latest" {
      most_recent = true
      owners = ["099720109477"]
      filter {
        name = "name"
        values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64*"]
      }
      filter {
        name = "virtualization-type"
        values = ["hvm"]
      }
}



