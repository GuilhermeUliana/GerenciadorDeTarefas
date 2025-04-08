const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { PrismaClient } = require('@prisma/client')

const app = express();
const db = new sqlite3.Database('./tarefas.db');

app.use(express.json());

// Criar tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL,
    status TEXT DEFAULT 'pendente',
    prazo TEXT
)`);

// Criar uma nova tarefa
app.post('/tarefas', (req, res) => {
    const { descricao, prazo } = req.body;
    db.run(`INSERT INTO tarefas (descricao, prazo) VALUES (?, ?)`, [descricao, prazo],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, descricao, status: 'pendente', prazo });
        });
});

// Listar todas as tarefas
app.get('/tarefas', (req, res) => {
    db.all(`SELECT * FROM tarefas`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Atualizar uma tarefa
app.put('/tarefas/:id', (req, res) => {
    const { descricao, status, prazo } = req.body;
    db.run(`UPDATE tarefas SET descricao=?, status=?, prazo=? WHERE id=?`, [descricao, status, prazo, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Tarefa atualizada!' });
        });
});

// Deletar uma tarefa
app.delete('/tarefas/:id', (req, res) => {
    db.run(`DELETE FROM tarefas WHERE id=?`, req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Tarefa removida!' });
    });
});

// Listar tarefas pendentes
app.get('/tarefas/pendentes', (req, res) => {
    db.all(`SELECT * FROM tarefas WHERE status='pendente'`, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Concluir uma tarefa
app.patch('/tarefas/:id/concluir', (req, res) => {
    db.run(`UPDATE tarefas SET status='concluída' WHERE id=?`, req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Tarefa concluída!' });
    });
});

app.listen(3000, () => console.log('gitServidor rodando na porta 3000'));
