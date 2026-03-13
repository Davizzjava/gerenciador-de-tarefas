// Array para guardar os objetos das tarefas
let tarefas = [];

function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem('minhasTarefasPremium');
  if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
  }
  renderizarLista();
}

function renderizarLista() {
  const lista = document.getElementById('listaTarefas');
  const estadoVazio = document.getElementById('estadoVazio');
  const contador = document.getElementById('contador');
  
  lista.innerHTML = ''; 

  // Controle da mensagem de lista vazia
  if (tarefas.length === 0) {
    estadoVazio.style.display = 'block';
  } else {
    estadoVazio.style.display = 'none';
  }

  // Atualiza o contador de tarefas pendentes
  const pendentes = tarefas.filter(t => !t.concluida).length;
  contador.innerText = `${pendentes} tarefas pendentes`;

  // Desenha cada tarefa na tela
  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    // Se estiver concluída, adiciona a classe CSS que risca o texto
    if (tarefa.concluida) {
      li.classList.add('concluida');
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${tarefa.concluida ? 'checked' : ''} onchange="alternarStatus(${index})">
      <span class="texto-tarefa">${tarefa.texto}</span>
      <button class="btn-excluir" onclick="removerTarefa(${index})" title="Excluir">🗑️</button>
    `;
    lista.appendChild(li);
  });
}

function adicionarTarefa() {
  const input = document.getElementById('novaTarefa');
  const texto = input.value.trim();

  if (texto !== "") {
    // Agora salvamos um objeto com o texto e o status
    tarefas.push({ texto: texto, concluida: false });
    salvarNoLocalStorage();
    renderizarLista();
    input.value = ""; 
    input.focus(); // Mantém o cursor piscando para digitar a próxima
  }
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  salvarNoLocalStorage();
  renderizarLista();
}

// Nova função: marca como feita ou não feita
function alternarStatus(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  salvarNoLocalStorage();
  renderizarLista();
}

function salvarNoLocalStorage() {
  localStorage.setItem('minhasTarefasPremium', JSON.stringify(tarefas));
}

// Permite adicionar com a tecla "Enter"
document.getElementById('novaTarefa').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    adicionarTarefa();
  }
});

// Inicia o app
carregarTarefas();
