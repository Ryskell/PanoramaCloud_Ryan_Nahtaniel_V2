#   CONSTRUIRE ET DEMARRER LES SERVICES 
```
docker-compose up --build
```
# DEMARRER LES SERVICES 
```
docker-compose up 
```
# RECREER DES CONTENEURS
```
docker-compose up --force-recreate
```
# ARRETER LES SERVICES 
```
docker-compose down
```
---

# INITIALISER LE RESEAU SWARM

 (WINDOWS) Téléchargez et installez Git pour Windows depuis gitforwindows.org

 Cliquez droit sur le dossier contenant votre script setup-swarm.sh et sélectionnez "Git Bash Here" pour ouvrir Git Bash dans ce répertoire.

 Dans Git Bash, rendez le script exécutable avec la commande suivante :

```
chmod +x setup-swarm.sh
```

 Toujours dans Git Bash, exécutez le script avec la commande suivante  :

```
./setup-swarm.sh
```

 (MAC OS ET LINUX) Simplement utiliser les deux commandes précédentes


#  TESTER LE RESEAU SWARM 

 Cliquez droit sur le dossier contenant votre script test-swarm.sh et sélectionnez "Git Bash Here" pour ouvrir Git Bash dans ce répertoire.

 Dans Git Bash, rendez le script exécutable avec la commande suivante :

```
chmod +x test-swarm.sh
```

 Toujours dans Git Bash, exécutez le script avec la commande suivante  :

```
./test-swarm.sh
```

 (MAC OS ET LINUX) Simplement utiliser les deux commandes précédentes


 Tester le statut des services

```
docker stack services myapp
```

 Verifier les conteneurs en cours d'execution

```
docker ps
```

---

# Documentation

## Docker

Il y a en tout 5 dockerfile, que vous retrouverez dans les dossiers "scocial-network-frontend", "social-network-backend" , "node_exporter", "prometheus" et "terraform" . Cela permet d'avoir une image pour la partie front, une pour le back, une pour les exporters Prometheus, une pour le déploiement terraform.

## Docker Compose

Notre fichier docker-compose.yml se trouve à la racine du projet, il orchestre nos différents services. Le front,back et data ont bien été séparés, et sont organisé en différents réseaux. Nous avons également fait en sorte que notre projet soit résilient aux pannes.

## Docker Swarm

Vous trouverez notre réseau swarm initialisé grace à notre fichier "setup-swarm.sh" à la racine, qui déploie un bon nombre de services de notre projet .

## AWS

Vous trouverez le déploiement terraform dans le dossier terraform, mais aussi 

## Monitoring avec Prometheus et Grafana

C'est la derniere technologie que nous avons intégré, mais nous n'avions pas fini. Les avancés sont disponiles dans le dossier Prometheus, mais aussi dans le docker-compose et le setup-swarm.