const balance = document.getElementById('balance');
const money_1 = document.getElementById('money-1');
const money_2 = document.getElementById('money-2');
const list = document.getElementById("list");
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = [];

// Add transactions
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter text and amount");
    } else {
        const newTransaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };

        transactions.push(newTransaction);
        addTransactionDOM(newTransaction);
        updateValues();
        text.value = "";
        amount.value = "";
    }
}
//edit list
function editTransaction(id) {
    const transactionToEdit = transactions.find(transaction => transaction.id === id);
    
    if (!transactionToEdit) return;

    // Populate form fields with current transaction details
    text.value = transactionToEdit.text;
    amount.value = Math.abs(transactionToEdit.amount); // Edit as positive value

    // Remove transaction from list temporarily
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateValues();
}


// ID generation
function generateID() {
    return Math.floor(Math.random() * 10000000);
}

// Add transaction to list
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}
// balanace
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

    balance.innerText = `$${total}`;
    money_1.innerText = `$${income}`;
    money_2.innerText = `$${Math.abs(expense)}`; // Display positive expense
}

// Initialize the application
function init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

// Event listeners
form.addEventListener("submit", addTransaction);

// Initialize the application on page load
init();
