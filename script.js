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

// Array para armazenar as transações
let transactions = [];

// Função para adicionar uma transação
function addTransaction(amount, description, date) {
  // Verifica se os parâmetros são válidos
  if (typeof amount !== "number" || amount <= 0) {
    console.log("Por favor, insira um valor válido para a quantia.");
    return;
  }

  if (typeof description !== "string" || description.trim() === "") {
    console.log("Por favor, insira uma descrição válida.");
    return;
  }

  if (!(date instanceof Date) || isNaN(date)) {
    console.log("Por favor, insira uma data válida.");
    return;
  }

  // Cria um objeto de transação
  const transaction = {
    amount: amount,
    description: description,
    date: date,
  };

  // Adiciona a transação ao array
  transactions.push(transaction);
  console.log("Transação adicionada com sucesso:", transaction);
}

// Exemplo de uso da função
addTransaction(150.5, "Depósito", new Date("2024-05-26"));
addTransaction(75.25, "Pagamento de conta", new Date("2024-05-27"));

console.log("Todas as transações:", transactions);
