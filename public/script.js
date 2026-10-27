const API_URL = "http://localhost:3000/pessoas";

const form = document.getElementById("form-pessoa");
const inputId = document.getElementById("pessoa-id");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const formTitulo = document.getElementById("form-titulo");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const tabelaCorpo = document.getElementById("tabela-pessoas");

async function carregarPessoas() {
  try {
    const resposta = await fetch(API_URL);
    const pessoas = await resposta.json();

    tabelaCorpo.innerHTML = "";

    if (pessoas.length === 0) {
      tabelaCorpo.innerHTML = `<tr><td colspan="4" style="text-align:center;">Nenhuma pessoa cadastrada.</td></tr>`;
      return;
    }

    pessoas.forEach(pessoa => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${pessoa.id}</td>
        <td>${pessoa.nome}</td>
        <td>${pessoa.idade} anos</td>
        <td class="actions">
          <button class="btn-editar" onclick="prepararEdicao(${pessoa.id}, '${pessoa.nome}', ${pessoa.idade})">Editar</button>
          <button class="btn-excluir" onclick="excluirPessoa(${pessoa.id})">Excluir</button>
        </td>
      `;
      tabelaCorpo.appendChild(tr);
    });
  } catch (erro) {
    console.error("Erro ao carregar pessoas:", erro);
    alert("Erro ao conectar com o servidor.");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = inputId.value;
  const nome = inputNome.value;
  const idade = Number(inputIdade.value);

  const dados = { nome, idade };

  try {
    let resposta;

    if (id) {
      resposta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
    } else {
      resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
    }

    if (resposta.ok) {
      limparFormulario();
      carregarPessoas();
    } else {
      const erroData = await resposta.json();
      alert(`Erro: ${erroData.mensagem || erroData.erro}`);
    }
  } catch (erro) {
    console.error("Erro ao salvar:", erro);
    alert("Erro na requisição.");
  }
});

async function excluirPessoa(id) {
  if (!confirm("Tem certeza que deseja excluir esta pessoa?")) return;

  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (resposta.ok) {
      carregarPessoas();
    } else {
      const erroData = await resposta.json();
      alert(`Erro: ${erroData.mensagem || erroData.erro}`);
    }
  } catch (erro) {
    console.error("Erro ao excluir:", erro);
    alert("Erro na requisição.");
  }
}

function prepararEdicao(id, nome, idade) {
  inputId.value = id;
  inputNome.value = nome;
  inputIdade.value = idade;

  formTitulo.textContent = "Editar Pessoa";
  btnSalvar.textContent = "Atualizar";
  btnCancelar.style.display = "inline-block";
}

function limparFormulario() {
  inputId.value = "";
  inputNome.value = "";
  inputIdade.value = "";

  formTitulo.textContent = "Cadastrar Pessoa";
  btnSalvar.textContent = "Cadastrar";
  btnCancelar.style.display = "none";
}

carregarPessoas();