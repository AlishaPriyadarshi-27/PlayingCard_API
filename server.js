const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

// Read cards
function readCards() {
  if (!fs.existsSync("cards.json")) {
    fs.writeFileSync("cards.json", "[]");
  }
  const data = fs.readFileSync("cards.json");
  return JSON.parse(data);
}

// Write cards
function writeCards(data) {
  fs.writeFileSync("cards.json", JSON.stringify(data, null, 2));
}

// GET all cards
app.get("/cards", (req, res) => {
  const cards = readCards();
  res.json(cards);
});

// POST new card
app.post("/cards", (req, res) => {
  const cards = readCards();
  const newCard = {
    id: Date.now(),
    suit: req.body.suit,
    value: req.body.value
  };
  cards.push(newCard);
  writeCards(cards);
  res.status(201).json(newCard);
});

// DELETE card
app.delete("/cards/:id", (req, res) => {
  let cards = readCards();
  cards = cards.filter(card => card.id != req.params.id);
  writeCards(cards);
  res.json({ message: "Card deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});