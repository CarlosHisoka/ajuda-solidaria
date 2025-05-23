const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ajuste se necessário
  database: 'ajuda_solidaria'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL conectado!');
});

module.exports = connection;
