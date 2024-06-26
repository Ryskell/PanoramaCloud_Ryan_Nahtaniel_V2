#!/bin/bash

# Charger les variables d'environnement à partir du fichier .env
if [ -f .env ]; then
  export $(cat .env | xargs)
else
  echo ".env file not found. Please create a .env file with your AWS credentials."
  exit 1
fi

# Vérifier si les clés AWS sont définies
if [ -z "$ACCESS_KEY" ] || [ -z "$SECRET_KEY" ]; then
  echo "AWS credentials not set in .env file."
  exit 1
fi

# Instructions pour les collaborateurs
echo "Assurez-vous que vos clés SSH sont correctement configurées dans les fichiers Terraform."

# Variables
TERRAFORM_DIR="./terraform"
ANSIBLE_DIR="./ansible"
AWS_REGION="us-east-1"

# Fonction pour créer et configurer les instances avec Multipass
setup_multipass_instances() {
  # Step 1: Create instances with Multipass
  echo "Creating instances with Multipass..."
  multipass launch --name manager -c 2 -m 2G -d 10G
  multipass launch --name worker1 -c 2 -m 2G -d 10G
  multipass launch --name worker2 -c 2 -m 2G -d 10G

  # Step 2: Install Docker on each instance
  echo "Installing Docker on each instance..."
  multipass exec manager -- bash -c "curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"
  multipass exec worker1 -- bash -c "curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"
  multipass exec worker2 -- bash -c "curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"

  # Step 3: Add ubuntu user to docker group
  echo "Adding ubuntu user to docker group..."
  multipass exec manager -- sudo usermod -aG docker ubuntu
  multipass exec worker1 -- sudo usermod -aG docker ubuntu
  multipass exec worker2 -- sudo usermod -aG docker ubuntu

  # Step 4: Restart instances to apply group changes
  echo "Restarting instances..."
  multipass restart manager
  multipass restart worker1
  multipass restart worker2

  # Step 5: Initialize Docker Swarm on the manager
  echo "Initializing Docker Swarm on the manager..."
  MANAGER_IP=$(multipass info manager | grep IPv4 | awk '{print $2}')
  multipass exec manager -- docker swarm init --advertise-addr $MANAGER_IP

  # Step 6: Get the join token for worker nodes
  echo "Getting the join token for worker nodes..."
  TOKEN=$(multipass exec manager -- docker swarm join-token worker -q)

  # Step 7: Join worker nodes to the Swarm
  echo "Joining worker nodes to the Swarm..."
  multipass exec worker1 -- docker swarm join --token $TOKEN $MANAGER_IP:2377
  multipass exec worker2 -- docker swarm join --token $TOKEN $MANAGER_IP:2377

  # Step 8: Transfer the project to the manager (if not already transferred)
  echo "Transferring the project to the manager..."
  multipass transfer ./PanoramaCloud_Ryan_Nahtaniel_V2 manager:/home/ubuntu/PanoramaCloud_Ryan_Nahtaniel_V2

  # Step 9: Deploy the services with Docker Stack
  echo "Deploying the services with Docker Stack..."
  multipass exec manager -- bash -c "cd /home/ubuntu/PanoramaCloud_Ryan_Nahtaniel_V2 && docker stack deploy -c docker-compose.yml myapp"

  echo "Docker Swarm setup and service deployment is complete."
}

# Fonction pour créer et configurer les instances avec Terraform et Ansible
setup_terraform_instances() {
  # Initialisation de Terraform
  echo "Initialisation de Terraform..."
  cd $TERRAFORM_DIR

  # Configurer les variables d'environnement pour Terraform
  export TF_VAR_access_key=$ACCESS_KEY
  export TF_VAR_secret_key=$SECRET_KEY

  terraform init

  # Appliquer le plan Terraform
  echo "Application du plan Terraform..."
  terraform apply -auto-approve

  # Récupérer les IPs des instances
  echo "Récupération des IPs des instances..."
  MANAGER_IP=$(terraform output -raw manager_ip)
  WORKER_IPS=$(terraform output -json worker_ips | jq -r '.[]')

  # Vérifier les IPs
  echo "Manager IP: $MANAGER_IP"
  echo "Worker IPs: $WORKER_IPS"

  # Mettre à jour le fichier d'inventaire Ansible
  echo "Mise à jour du fichier d'inventaire Ansible..."
  cd $ANSIBLE_DIR
  cat > inventory.ini <<EOL
[manager]
manager ansible_host=$MANAGER_IP

[workers]
$(for ip in $WORKER_IPS; do echo "worker ansible_host=$ip"; done)

[all:vars]
ansible_python_interpreter=/usr/bin/python3
EOL

  # Exécuter le playbook Ansible
  echo "Exécution du playbook Ansible..."
  ansible-playbook -i inventory.ini playbook.yml

  echo "Déploiement et configuration complétés avec succès."
}

# Exécuter les deux fonctions
setup_multipass_instances
setup_terraform_instances

echo "Déploiement complet avec Multipass et Terraform terminé."
