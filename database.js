const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tarefas.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        status TEXT CHECK(status IN ('pendente', 'concluída')) DEFAULT 'pendente',
        prazo TEXT
    )`);
});

module.exports = db;
    