aws_region   = "us-east-1"
ami_id       = "ami-0c55b159cbfafe1f0"  # Exemple pour Ubuntu 20.04
instance_type = "t2.micro"
public_key   = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC..."
private_key  = <<EOF
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEA7...
-----END RSA PRIVATE KEY-----
EOF
