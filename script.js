const progressBar = document.getElementById("progress");
const cards = document.querySelectorAll(".card");
const pairs = cards.length / 2;
let flippedCards = 0;
let firstCard = null;

// Sumaišykite kortas
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Apverskite kortelę
function flipCard(card) {
    card.classList.add("flipped");
    flippedCards++;

    if (flippedCards === 2) {
        if (firstCard.dataset.value === card.dataset.value) {
            // Kortelės sutampa
            firstCard.classList.add("matched");
            card.classList.add("matched");
            firstCard = null;
            flippedCards = 0;

            // Patikrinkite, ar visas žaidimas baigtas
            if (document.querySelectorAll(".matched").length === pairs) {
                alert("Jūs laimėjote!");
            }
        } else {
            // Kortelės nesutampa
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                card.classList.remove("flipped");
                firstCard = null;
                flippedCards = 0;
            }, 1000);
        }
    } else {
        firstCard = card;
    }
}

// Sukurkite kortas
for (let i = 0; i < pairs
