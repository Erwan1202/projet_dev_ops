// auth-service/index.js

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Inscription
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email, password },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Email already exists or invalid data.' });
  }
});

// Connexion (très simplifiée)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && user.password === password) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Liste des utilisateurs
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
