const db = require('../config/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM solicitacoes', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  const { descricao, status, id_beneficiario } = req.body;
  db.query(
    'INSERT INTO solicitacoes (descricao, status, id_beneficiario) VALUES (?, ?, ?)',
    [descricao, status, id_beneficiario],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: result.insertId });
    }
  );
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { descricao, status } = req.body;
  db.query(
    'UPDATE solicitacoes SET descricao = ?, status = ? WHERE id = ?',
    [descricao, status, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
};

exports.delete = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM solicitacoes WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};
