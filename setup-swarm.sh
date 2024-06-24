#!/bin/bash

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
