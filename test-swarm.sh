# Vérifiez le statut des services déployés
multipass exec manager -- docker stack services myapp

# Vérifiez le statut des conteneurs
multipass exec manager -- docker ps

# Vérifiez les journaux des services
multipass exec manager -- docker service logs myapp_nginx
multipass exec manager -- docker service logs myapp_frontend
multipass exec manager -- docker service logs myapp_backend
multipass exec manager -- docker service logs myapp_mysql

# Tester l'accès aux services
MANAGER_IP=$(multipass info manager | grep IPv4 | awk '{print $2}')
curl http://$MANAGER_IP:3000
curl http://$MANAGER_IP:3001

