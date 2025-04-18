
Projet DevOps - Microservices avec Docker, Kubernetes et CI

---

📚 Description

Ce projet est composé de deux microservices indépendants :
- Auth Service : gestion des utilisateurs (inscription, connexion, listing)
- Task Service : gestion des tâches (création, consultation, validation, suppression)

Chaque service dispose de sa propre base de données PostgreSQL, son propre conteneur Docker et est orchestré par Kubernetes.

---

⚙️ Technologies utilisées

- Node.js + Express
- Prisma ORM
- PostgreSQL
- Docker
- Kubernetes
- GitHub Actions (CI/CD - à venir)

---

🛠 Architecture du projet

Client (Postman / Front simple)
   |
Auth Service (Node.js / Express) -----> PostgreSQL (authdb)
   |
Task Service (Node.js / Express) -----> PostgreSQL (taskdb)

Tout est conteneurisé avec Docker puis déployé sur Kubernetes.

---

🚀 Installation et lancement du projet

1. Cloner le projet :

git clone git@github.com:Erwan1202/projet_dev_ops.git
cd projet_dev_ops

---

2. Lancer les bases de données PostgreSQL avec Docker :

# Base de données pour auth-service
docker run --name auth-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=authdb -p 5432:5432 -d postgres

# Base de données pour task-service
docker run --name task-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=taskdb -p 5433:5432 -d postgres

---

3. Construire les images Docker des services :

# Auth Service
cd auth-service
docker build -t auth-service .
cd ..

# Task Service
cd task-service
docker build -t task-service .
cd ..

---

4. Déployer avec Kubernetes :

Créer les secrets d'environnement :

kubectl create secret generic auth-env --from-env-file=auth-service/.env
kubectl create secret generic task-env --from-env-file=task-service/.env

Déployer les services :

kubectl apply -f auth-service/auth-deployment.yaml
kubectl apply -f auth-service/auth-service.yaml

kubectl apply -f task-service/task-deployment.yaml
kubectl apply -f task-service/task-service.yaml

---

5. Vérifier que tout est en cours d'exécution :

kubectl get pods
kubectl get services

---

🧪 API Endpoints

Auth Service (localhost:4000)

- POST /register : Créer un utilisateur
- POST /login : Connexion d'un utilisateur
- GET /users : Lister tous les utilisateurs

Task Service (localhost:5000)

- POST /tasks : Créer une tâche
- GET /tasks : Lister toutes les tâches
- PUT /tasks/:id/done : Marquer une tâche comme terminée
- DELETE /tasks/:id : Supprimer une tâche

---

📸 Exemple d'utilisation Postman

Inscription d'un utilisateur :

POST http://localhost:4000/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "123456"
}

Création d'une tâche :

POST http://localhost:5000/tasks
Content-Type: application/json

{
  "title": "Terminer projet",
  "description": "Avant le 20 avril"
}

---

🛡️ Notes

- Assurez-vous que Docker Desktop est bien lancé et que Kubernetes est activé.
- Les bases de données doivent être démarrées avant le déploiement des microservices.
