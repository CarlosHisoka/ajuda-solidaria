const db = require('../config/db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM doadores', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  const { nome, contato, endereco } = req.body;
  db.query('INSERT INTO doadores (nome, contato, endereco) VALUES (?, ?, ?)',
    [nome, contato, endereco],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: result.insertId });
    }
  );
};
