//your code here

// Get the necessary elements from the HTML
const deck = document.getElementById('deck');
const cardholders = document.getElementsByClassName('placed');
const resetButton = document.getElementById('reset');
const shuffleButton = document.getElementById('shuffle');
const wonSection = document.getElementById('won');

// Initialize cardholders array
let cardholdersArray = [null, null, null, null];

// Add event listeners for drag and drop functionality
for (const cardholder of cardholders) {
  cardholder.addEventListener('dragover', allowDrop);
  cardholder.addEventListener('drop', handleDrop);
}

// Add event listeners for card dragging
const cards = document.getElementsByClassName('whitebox2');
for (const card of cards) {
  card.addEventListener('dragstart', handleDragStart);
}

// Add event listeners for buttons
resetButton.addEventListener('click', resetGame);
shuffleButton.addEventListener('click', shuffleCards);

// Function to handle card dragging
function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

// Function to handle dropping a card onto a cardholder
function handleDrop(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData('text/plain');
  const card = document.getElementById(cardId);
  const cardholderId = event.currentTarget.id;
  const cardholderIndex = parseInt(cardholderId) - 100;

  // Check if the card can be placed in the cardholder
  if (isValidPlacement(card, cardholderIndex)) {
    event.currentTarget.appendChild(card);
    cardholdersArray[cardholderIndex] = card;
    checkGameCompletion();
  }
}

// Function to allow dropping on a cardholder
function allowDrop(event) {
  event.preventDefault();
}

// Function to check if the card can be placed in the cardholder
function isValidPlacement(card, cardholderIndex) {
  const cardType = getCardType(card);
  const expectedCardholderId = cardholderIndex + 100;

  return cardType === expectedCardholderId;
}

// Function to get the card type (club, diamond, heart, spade)
function getCardType(card) {
  const cardImg = card.getElementsByTagName('img')[0];
  const cardImgSrc = cardImg.getAttribute('src');
  const cardType = cardImgSrc.split('/').pop().split('.').shift();
  return parseInt(cardType);
}

// Function to check if the game has been completed
function checkGameCompletion() {
  if (cardholdersArray.every(card => card !== null)) {
    wonSection.style.display = 'block';
  }
}

// Function to reset the game
function resetGame() {
  // Reset the cardholders
  for (const cardholder of cardholders) {
    cardholder.innerHTML = '';
  }

  // Reset the cardholders array
  cardholdersArray = [null, null, null, null];

  // Hide the "won" section
  wonSection.style.display = 'none';
}

// Function to shuffle the cards in the deck
function shuffleCards() {
  // Clone the deck element
  const clonedDeck = deck.cloneNode(true);

  // Shuffle the cards by randomizing their order
  const cards = Array.from(clonedDeck.getElementsByClassName('whitebox2'));
  cards.sort(() => Math.random() - 0.5);

  // Replace the existing deck with the shuffled deck
  deck.innerHTML = '';
  for (const card of cards) {
    deck.appendChild(card);
  }

  // Reset the game
  resetGame();
}