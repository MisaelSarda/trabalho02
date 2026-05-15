const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'db',
    database: process.env.DB_NAME || 'doacoes_db',
    password: process.env.DB_PASSWORD || '12345',
    port: process.env.DB_PORT || 5432,
});

pool.query(`
    CREATE TABLE IF NOT EXISTS doacoes (
        id SERIAL PRIMARY KEY,
        tipo VARCHAR(50) NOT NULL,
        descricao VARCHAR(255) NOT NULL,
        quantidade INT NOT NULL,
        data_doacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`).catch(err => console.error("Erro ao criar tabela:", err));


app.post('/api/doacoes', async (req, res) => {
    const { tipo, descricao, quantidade } = req.body;
    try {
        await pool.query(
            'INSERT INTO doacoes (tipo, descricao, quantidade) VALUES ($1, $2, $3)',
            [tipo, descricao, quantidade]
        );
        res.status(201).json({ message: 'Doação cadastrada com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/doacoes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM doacoes ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.delete('/api/doacoes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM doacoes WHERE id = $1', [id]);
        res.json({ message: 'Doação excluída com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});