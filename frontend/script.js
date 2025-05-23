const formDoadores = document.getElementById('formDoadores');
const listaDoadores = document.getElementById('listaDoadores');

const API_URL = 'http://localhost:3000'; // backend rodando localmente

// Função para mostrar doadores
function carregarDoadores() {
  fetch(`${API_URL}/doadores`)
    .then(res => res.json())
    .then(data => {
      listaDoadores.innerHTML = '';
      data.forEach(doador => {
        const li = document.createElement('li');
        li.textContent = `${doador.nome} - ${doador.contato} - ${doador.endereco}`;
        listaDoadores.appendChild(li);
      });
    });
}

formDoadores.addEventListener('submit', e => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const contato = document.getElementById('contato').value;
  const endereco = document.getElementById('endereco').value;

  fetch(`${API_URL}/doadores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, contato, endereco })
  })
  .then(res => res.json())
  .then(data => {
    alert('Doador cadastrado!');
    formDoadores.reset();
    carregarDoadores();
  })
  .catch(err => alert('Erro ao cadastrar doador'));
});

carregarDoadores();
