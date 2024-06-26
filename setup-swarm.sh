#!/bin/bash

# Charger les variables d'environnement à partir du fichier .env
if [ -f .env ]; then
  export $(cat .env | xargs)
else
  echo "Fichier .env non trouvé. Veuillez créer un fichier .env avec vos identifiants AWS."
  exit 1
fi

# Vérifier si les clés AWS sont définies
if [ -z "$ACCESS_KEY" ] || [ -z "$SECRET_KEY" ]; then
  echo "Les identifiants AWS ne sont pas définis dans le fichier .env."
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
  # Étape 1 : Créer des instances avec Multipass
  echo "Création des instances avec Multipass..."
  multipass launch --name manager -c 2 -m 2G -d 10G
  multipass launch --name worker1 -c 2 -m 2G -d 10G
  multipass launch --name worker2 -c 2 -m 2G -d 10G

  # Étape 2 : Installer Docker sur chaque instance
  echo "Installation de Docker sur chaque instance..."
  multipass exec manager -- bash -c "curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"
  multipass exec worker1 -- bash -c "curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"
  multipass exec worker2 -- bash -c "curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"

  # Étape 3 : Ajouter l'utilisateur ubuntu au groupe docker
  echo "Ajout de l'utilisateur ubuntu au groupe docker..."
  multipass exec manager -- sudo usermod -aG docker ubuntu
  multipass exec worker1 -- sudo usermod -aG docker ubuntu
  multipass exec worker2 -- sudo usermod -aG docker ubuntu

  # Étape 4 : Redémarrer les instances pour appliquer les modifications du groupe
  echo "Redémarrage des instances..."
  multipass restart manager
  multipass restart worker1
  multipass restart worker2

  # Étape 5 : Initialiser Docker Swarm sur le manager
  echo "Initialisation de Docker Swarm sur le manager..."
  MANAGER_IP=$(multipass info manager | grep IPv4 | awk '{print $2}')
  multipass exec manager -- docker swarm init --advertise-addr $MANAGER_IP

  # Étape 6 : Obtenir le token de join pour les nœuds worker
  echo "Obtention du token de join pour les nœuds worker..."
  TOKEN=$(multipass exec manager -- docker swarm join-token worker -q)

  # Étape 7 : Joindre les nœuds worker au Swarm
  echo "Jonction des nœuds worker au Swarm..."
  multipass exec worker1 -- docker swarm join --token $TOKEN $MANAGER_IP:2377
  multipass exec worker2 -- docker swarm join --token $TOKEN $MANAGER_IP:2377

  # Étape 8 : Transférer le projet au manager (si non déjà transféré)
  echo "Transfert du projet au manager..."
  multipass transfer ./PanoramaCloud_Ryan_Nahtaniel_V2 manager:/home/ubuntu/PanoramaCloud_Ryan_Nahtaniel_V2

  # Étape 9 : Déployer les services avec Docker Stack
  echo "Déploiement des services avec Docker Stack..."
  multipass exec manager -- bash -c "cd /home/ubuntu/PanoramaCloud_Ryan_Nahtaniel_V2 && docker stack deploy -c docker-compose.yml myapp"

  echo "Configuration de Docker Swarm et déploiement des services terminés."
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
