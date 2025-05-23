const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const doadorRoutes = require('./routes/doadores');
const itemRoutes = require('./routes/itens'); // 👈 novo
const solicitacaoRoutes = require('./routes/solicitacoes'); // 👈 novo

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/doadores', doadorRoutes);
app.use('/api/itens', itemRoutes); // 👈 novo
app.use('/api/solicitacoes', solicitacaoRoutes); // 👈 novo

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
