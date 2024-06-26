output "manager_ip" {
  description = "Public IP of the manager instance"
  value       = aws_instance.manager.public_ip
}

output "worker_ips" {
  description = "Public IPs of the worker instances"
  value       = [for instance in aws_instance.worker : instance.public_ip]
}
