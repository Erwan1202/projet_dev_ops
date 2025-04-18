const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Créer une tâche
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  const task = await prisma.task.create({
    data: { title, description },
  });
  res.json(task);
});

// Voir toutes les tâches
app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Marquer une tâche comme terminée
app.put('/tasks/:id/done', async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.update({
    where: { id: parseInt(id) },
    data: { done: true },
  });
  res.json(task);
});

// Supprimer une tâche
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`Task Service running on port ${PORT}`);
});
