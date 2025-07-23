const quotes =[ 
  "You do not rise to the level of your goals. You fall to the level of your systems.",
  "Every action you take is a vote for the type of person you wish to become.",
  "Habits are the compound interest of self-improvement",
  "You should be far more concerned with your current trajectory than with your current results.",
  "The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become.",
  "Success is the product of daily habits, not once-in-a-lifetime transformation.",
  "Small changes often appear to make no difference until you cross a criticial threshold.",
  "Be the designer of your world and not merely the consumer of it.",
  "You don't have to be the victim of your environment. You can also be the architect of it.",
  "You get what you repeat.",
  "The task of building a good habit is like cultivating a delicate flower one day at a time. It won't bloom overnight, but it will bloom if you keep watering it."
];

let currentQuote='';
let startTime;

const quoteDisplay = document.getElementById('quote');
const inputBox= document.getElementById('input');
const resultDisplay = document.getElementById('result');
const startButton = document.getElementById('startBtn');

function getRandomQuote() {
  const randomindex = Math.floor(Math.random() * quotes.length);
  return quotes[randomindex];
}

function startTest() {
  currentQuote = getRandomQuote();
  quoteDisplay.textContent = currentQuote;
  inputBox.value='';
  resultDisplay.textContent='';
  startTime = new Date().getTime();
  inputBox.disabled = false;
  inputBox.focus();
}

function endTest() {
  const endTime = new Date().getTime();
  const totalTime = (endTime - startTime) / 1000;
  const userText = inputBox.value.trim();

  const wordsTyped = userText.split(" ").length;
  const speed = Math.round((wordsTyped/totalTime) * 60);

  const isCorrect = userText === currentQuote;

  if (isCorrect) {
    resultDisplay.innerHTML= `ok fast fingers <br>Typing Speed: <b>${speed} WPM</b>`;
  } else {
    resultDisplay.innerHTML = `get it accurate next time!`;
  }

  inputBox.disabled = true;
}

inputBox.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    endTest();
  }
});

startButton.addEventListener('click', startTest);
