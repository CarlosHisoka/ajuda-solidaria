const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const db = require('./db');

app.use(cors());
app.use(express.json());

// Teste rápido
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// CRUD Doadores

app.post('/doadores', (req, res) => {
  const { nome, contato, endereco } = req.body;
  const sql = 'INSERT INTO Doadores (nome, contato, endereco) VALUES (?, ?, ?)';
  db.query(sql, [nome, contato, endereco], (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar doador:', err); // Aqui mostra o erro no terminal
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, nome, contato, endereco });
  });
});


app.get('/doadores', (req, res) => {
  const sql = 'SELECT * FROM Doadores';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put('/doadores/:id', (req, res) => {
  const { id } = req.params;
  const { nome, contato, endereco } = req.body;
  const sql = 'UPDATE Doadores SET nome = ?, contato = ?, endereco = ? WHERE id = ?';
  db.query(sql, [nome, contato, endereco, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Doador atualizado com sucesso' });
  });
});

app.delete('/doadores/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Doadores WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Doador excluído com sucesso' });
  });
});

// CRUD Itens

app.post('/itens', (req, res) => {
  const { nome, quantidade, status, id_doador } = req.body;
  const sql = 'INSERT INTO Itens (nome, quantidade, status, id_doador) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, quantidade, status, id_doador], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, nome, quantidade, status, id_doador });
  });
});

app.get('/itens', (req, res) => {
  const sql = 'SELECT * FROM Itens';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put('/itens/:id', (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, status, id_doador } = req.body;
  const sql = 'UPDATE Itens SET nome = ?, quantidade = ?, status = ?, id_doador = ? WHERE id = ?';
  db.query(sql, [nome, quantidade, status, id_doador, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Item atualizado com sucesso!' });
  });
});

app.delete('/itens/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Itens WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Item excluído com sucesso!' });
  });
});



app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
