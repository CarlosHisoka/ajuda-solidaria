document.getElementById('formDoador').addEventListener('submit', async function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const contato = document.getElementById('contato').value;
  const endereco = document.getElementById('endereco').value;

  const response = await fetch('http://localhost:3000/api/doadores', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ nome, contato, endereco })
  });

  if (response.ok) {
    alert('Doador cadastrado com sucesso!');
    document.getElementById('formDoador').reset();
  } else {
    alert('Erro ao cadastrar.');
  }
});
