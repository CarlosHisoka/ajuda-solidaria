const db = require('../config/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM itens', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  const { nome_item, quantidade, status, id_doador } = req.body;
  db.query(
    'INSERT INTO itens (nome_item, quantidade, status, id_doador) VALUES (?, ?, ?, ?)',
    [nome_item, quantidade, status, id_doador],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: result.insertId });
    }
  );
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { nome_item, quantidade, status } = req.body;
  db.query(
    'UPDATE itens SET nome_item = ?, quantidade = ?, status = ? WHERE id = ?',
    [nome_item, quantidade, status, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
};

exports.delete = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM itens WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};
