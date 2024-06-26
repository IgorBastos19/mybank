src =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
integrity =
  "sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+6BAMw1LMwNLD69Npy4HI+N9+8BxB";
crossorigin = "anonymous";

//Ele configura a funcionalidade de alternância do menu, onde ao clicar no elemento com id menu-toggle, a classe show será adicionada ou removida do elemento com id navbar.
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");
  });
});

//Esta variável global armazena todas as transações.
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
  data,
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

  if (typeof amount !== "number") {
    console.log("Por favor, insira um valor válido para a quantia.");
    return;
  }

  if (typeof description !== "string" || description.trim() === "") {
    console.log("Por favor, insira uma descrição válida.");
    return;
  }

  if(type==="cash-in"){
    amount=amount
  }else{
    amount = -amount
  }

  // Cria um objeto de transação
  const transaction = {
    id: id,
    data: data,
    amount: amount,
    type: type,
    account: account,
    category: category,
    split: split,
    description: description,
  };

  // Adiciona a transação ao array
  transactions.push(transaction);
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
            <td>${transaction.data}</td>
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
    const data = document.getElementById("data").value;
    const account = document.getElementById("conta").value;
    const category = document.getElementById("classe").value;
    const split = document.getElementById("split").value;
    const description = document.getElementById("descricao").value;

    addTransaction(id, data, amount, type, account, category, split, description);

    
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

//Total cash-in
function totalCashIn() {
  let cashIn = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "cash-in") {
      cashIn = cashIn + transactions[i].amount;
    }
  }
  return cashIn;
}

// Atualiza o valor do saldo no HTML
function atualizarCashIn() {
  const cashInElement = document.getElementById("cash-in");
  const cashIn = totalCashIn();
  cashInElement.textContent = formatCurrency(cashIn);
}

window.onload = function () {
  atualizarSaldo();
  atualizarCashIn();
  atualizarCashOut();
  atualizarQuantidade();
  atualizarSplit();
  atualizarSaldoItau();
  atualizarSaldoXp();
};

//Total cash-out
function totalCashOut() {
  let cashOut = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "cash-out") {
      cashOut = cashOut + transactions[i].amount;
    }
  }
  return cashOut;
}

// Atualiza o valor do saldo no HTML
function atualizarCashOut() {
  const cashOutElement = document.getElementById("cash-out");
  const cashOut = totalCashOut();
  cashOutElement.textContent = formatCurrency(cashOut);
}

//quantidade de transaction
function quantidadeTransaction() {
  return transactions.length;
}

// Atualiza o valor do saldo no HTML
function atualizarQuantidade() {
  const quantidadeElement = document.getElementById("quantidade");
  const quantidade = quantidadeTransaction();
  quantidadeElement.textContent = quantidade + " transações";
}

//soma do valor de split
function totalSplit() {
  let split = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].split === "sim") {
      split = split + transactions[i].amount;
    }
  }
  return split;
}

function atualizarSplit() {
  const splitElement = document.getElementById("split");
  const split = totalSplit();
  splitElement.textContent = formatCurrency(split);
}

//saldo itau
function totalItau() {
  let itau = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].account === "itau") {
      itau = itau + transactions[i].amount;
    }
  }
  return itau;
}

// Atualiza o valor do saldo no HTML
function atualizarSaldoItau() {
  const itauElement = document.getElementById("itau");
  const Saldoitau = totalItau();
  itauElement.textContent = formatCurrency(Saldoitau);
}

//saldo xp
function totalXp() {
  let xp = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].account === "xp") {
      xp = xp + transactions[i].amount;
    }
  }
  return xp;
}

// Atualiza o valor do saldo no HTML
function atualizarSaldoXp() {
  const itauElement = document.getElementById("xp");
  const Saldoxp = totalXp();
  itauElement.textContent = formatCurrency(Saldoxp);
}

function calcularTotalPorCategoria(categoria) {
  let total = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].category === categoria) {
      total += transactions[i].amount;
    }
  }
  return total;
}

// Exemplos de uso:

// Saldo do salário
let totalSalario = calcularTotalPorCategoria("salario");

// Saldo da energia
let totalEnergia = calcularTotalPorCategoria("energia");

// Saldo do investimento
let totalInvestimento = calcularTotalPorCategoria("investimento");

// Saldo do lanche
let totalLanche = calcularTotalPorCategoria("lanche");

// Saldo do transporte
let totalTransporte = calcularTotalPorCategoria("transporte");

// Saldo da alimentação
let totalAlimentacao = calcularTotalPorCategoria("alimentação");

// Saldo da educação
let totalEducacao = calcularTotalPorCategoria("educação");

// Saldo da saúde
let totalSaude = calcularTotalPorCategoria("saude");

// Saldo do entretenimento
let totalEntretenimento = calcularTotalPorCategoria("entretenimento");

// Saldo do vestuário
let totalVestuario = calcularTotalPorCategoria("vesturaio");

// Saldo da internet
let totalInternet = calcularTotalPorCategoria("internet");

// Saldo do telefone
let totalTelefone = calcularTotalPorCategoria("telefone");

// Saldo da água
let totalAgua = calcularTotalPorCategoria("agua");

// Saldo do aluguel
let totalAluguel = calcularTotalPorCategoria("aluguel");

document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('transactionChart').getContext('2d');
  const transactionChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['Salário', 'Energia', 'Investimento', 'Lanche', 'Transporte', 'Alimentação', 'Educação', 'Saúde', 'Entretenimento', 'Vestuário', 'Internet', 'Telefone', 'Água', 'Aluguel'],
          datasets: [{
              label: 'Transações',
              data: [calcularTotalPorCategoria("salario"), calcularTotalPorCategoria("energia"), calcularTotalPorCategoria("investimentos"), calcularTotalPorCategoria("lanche"),  calcularTotalPorCategoria("vestuario"), calcularTotalPorCategoria("transporte"), calcularTotalPorCategoria("alimentacao"), calcularTotalPorCategoria("educacao"), calcularTotalPorCategoria("saude"), calcularTotalPorCategoria("entretenimento"), calcularTotalPorCategoria("vestuario"), calcularTotalPorCategoria("internet"), calcularTotalPorCategoria("telefone"), calcularTotalPorCategoria("agua"), calcularTotalPorCategoria("aluguel")],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)'
              ],
              borderWidth: 1
          }]
      },
    });
});

// Função para exibir as transações na tabela
function displayTransactions(dataFiltro) {
  const transactionTableBody = document.getElementById("transactionTableBody");
  transactionTableBody.innerHTML = "";

  transactions.forEach((transaction) => {
    // Verifica se a transação ocorreu na data especificada, se houver um filtro de data
    if (dataFiltro && transaction.data !== dataFiltro) {
      return; // Pula para a próxima transação se não corresponder à data do filtro
    }

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.data}</td>
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