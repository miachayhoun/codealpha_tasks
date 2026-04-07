const symbols = ["🍎","🍌","🍇","🍒","🍎","🍌","🍇","🍒"];
let shuffled = symbols.sort(() => 0.5 - Math.random());

let board = document.getElementById("gameBoard");
let firstCard = null;
let secondCard = null;
let lock = false;
shuffled.forEach(symbol => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.innerText = "❓";
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
});
function flipCard(card) {
    if (lock || card === firstCard || card.classList.contains("flipped")) return;
    card.innerText = card.dataset.symbol;
    card.classList.add("flipped");
    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkMatch();
    }
}
function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        resetTurn();
    } else {
        lock = true;
        setTimeout(() => {
            firstCard.innerText = "❓";
            secondCard.innerText = "❓";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        }, 800);
    }
}
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lock = false;
}