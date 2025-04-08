// Importa o express
const express = require('express');

const { PrismaClient } = require('@prisma/client');

// Criar um variavel para trabalhar com express
const router = express.Router();
const prisma = new PrismaClient();

app.get('/employee', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
  });

// Rota get
router.get('/', (req, res) => {
  
});

module.exports = router