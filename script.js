src =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
integrity =
  "sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+6BAMw1LMwNLD69Npy4HI+N9+8BxB";
crossorigin = "anonymous";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");
  });
});

// script.js

let transactions = [];

// Função para carregar transações do localStorage
function loadTransactions() {
  const savedTransactions = localStorage.getItem("transactions");
  if (savedTransactions) {
    transactions = JSON.parse(savedTransactions);
  }
}

// Função para salvar transações no localStorage
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
// Função para adicionar uma transação
function addTransaction(
  id,
  amount,
  type,
  account,
  category,
  split,
  description
) {
  // Verifica se os parâmetros são válidos
  if (typeof id !== "number" || id <= 0) {
    console.log("Por favor, insira um ID válido.");
    return;
  }

  if (typeof amount !== "number" || amount <= 0) {
    console.log("Por favor, insira um valor válido para a quantia.");
    return;
  }

  if (typeof description !== "string" || description.trim() === "") {
    console.log("Por favor, insira uma descrição válida.");
    return;
  }

  // Cria um objeto de transação
  const transaction = {
    id: id,
    amount: parseFloat(amount),
    type: type,
    account: account,
    category: category,
    split: split,
    description: description,
  };

  // Adiciona a transação ao array
  transactions.push(transaction);
  console.log("Transação adicionada com sucesso:", transaction);
  // Salva as transações no localStorage
  saveTransactions();
  // Atualiza a tabela de transações exibida
  displayTransactions();
}

// Função para exibir as transações na tabela
function displayTransactions() {
  const transactionTableBody = document.getElementById("transactionTableBody");
  transactionTableBody.innerHTML = "";

  transactions.forEach((transaction) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${transaction.id}</td>
            <td>R$ ${transaction.amount.toFixed(2).replace(".", ",")}</td>
            <td>${transaction.type}</td>
            <td>${transaction.account}</td>
            <td>${transaction.category}</td>
            <td>${transaction.split}</td>
            <td>${transaction.description}</td>
        `;

    transactionTableBody.appendChild(row);
  });
}

// Adiciona um listener para o evento de submissão do formulário
document.addEventListener("DOMContentLoaded", () => {
  // Carrega as transações salvas do localStorage
  loadTransactions();

  // Exibe as transações ao carregar a página
  displayTransactions();

  const form = document.getElementById("transactionForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio do formulário

    const id = parseInt(document.getElementById("id").value);
    const amount = parseFloat(
      document.getElementById("valor").value.replace(",", ".")
    );
    const type = document.getElementById("tipo").value;
    const account = document.getElementById("conta").value;
    const category = document.getElementById("classe").value;
    const split = document.getElementById("split").value;
    const description = document.getElementById("descricao").value;

    addTransaction(id, amount, type, account, category, split, description);

    form.reset(); // Limpa o formulário após a submissão
  });
});

//funcao soma
function soma(transactions) {
  let soma = 0;
  for (let i = 0; i < transactions.length; i++) {
    soma = soma + transactions[i].amount;
  }
  return soma;
}

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Atualiza o valor do saldo no HTML
function atualizarSaldo() {
  const saldoElement = document.getElementById("saldo");
  const saldo = soma(transactions);
  saldoElement.textContent = formatCurrency(saldo);
}

window.onload = atualizarSaldo;
