#   CONSTRUIRE ET DEMARRER LES SERVICES 

docker-compose up --build

# DEMARRER LES SERVICES 

docker-compose up 

# RECREER DES CONTENEURS

docker-compose up --force-recreate

# ARRETER LES SERVICES 

docker-compose down

# -----------------------------

# INITIALISER LE RESEAU SWARM

# (WINDOWS) Téléchargez et installez Git pour Windows depuis gitforwindows.org

# Cliquez droit sur le dossier contenant votre script setup-swarm.sh et sélectionnez "Git Bash Here" pour ouvrir Git Bash dans ce répertoire.

# Dans Git Bash, rendez le script exécutable avec la commande suivante :

chmod +x setup-swarm.sh

# Toujours dans Git Bash, exécutez le script avec la commande suivante  :

./setup-swarm.sh

# (MAC OS ET LINUX) Simplement utiliser les deux commandes précédentes


# -- TESTER LE RESEAU SWARM --

# Cliquez droit sur le dossier contenant votre script test-swarm.sh et sélectionnez "Git Bash Here" pour ouvrir Git Bash dans ce répertoire.

# Dans Git Bash, rendez le script exécutable avec la commande suivante :

chmod +x test-swarm.sh

# Toujours dans Git Bash, exécutez le script avec la commande suivante  :

./test-swarm.sh

# (MAC OS ET LINUX) Simplement utiliser les deux commandes précédentes


# Tester le statut des services

docker stack services myapp

# Verifier les conteneurs en cours d'execution

docker ps

