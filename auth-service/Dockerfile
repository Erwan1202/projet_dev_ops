# Étape 1 : Build de l'application
FROM node:20-alpine

# Créer un dossier pour ton app
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./
RUN npm install

# Copier le reste du projet
COPY . .

# Générer le Prisma client
RUN npx prisma generate

# Exposer le port
EXPOSE 4000

# Commande de démarrage
CMD ["node", "index.js"]
