# Utiliser une version plus récente de Node.js
FROM node:18

# Créer un répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port 8080
EXPOSE 8080

# Démarrer l'application
CMD ["npm", "start"]
