const paragraphs = [
  "You do not rise to the level of your goals. You fall to the level of your systems. Your system is perfectly designed to give you the results you’re getting.",
  "Every action you take is a vote for the type of person you wish to become. No single instance will transform your beliefs, but as the votes build up, so does the evidence of your new identity.",
  "Habits are the compound interest of self-improvement. The effects of your habits multiply as you repeat them. They seem to make little difference on any given day and yet the impact they deliver over months and years can be enormous.",
  "The most practical way to change who you are is to change what you do. Each habit not only gets results but also teaches you something far more important: to trust yourself.",
  "The task of building a good habit is like cultivating a delicate flower one day at a time. It won’t bloom overnight, but it will bloom if you keep watering it.",
  "You should be far more concerned with your current trajectory than with your current results. If you're improving even 1% every day, you'll be in a completely different place a year from now.",
  "When nothing seems to help, I go and look at a stonecutter hammering away at his rock. He may hit it a hundred times without a crack showing, yet at the hundred and first blow it will split in two.",
  "The work that hurts you now will bless you later. The costs of your good habits are in the present. The costs of your bad habits are in the future.",
  "You don’t have to be the victim of your environment. You can be the architect of it. Design beats discipline when discipline fails.",
  "It is not about having something to motivate you—it is about becoming someone who doesn’t need to be motivated all the time."
];

let currentParagraph = 0;
let isTestRunning = false;
let startTime = 0;
let interval = null;

const quoteElement = document.getElementById('quote');
const quoteInput = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const popup = document.getElementById('popup');
const popupTime = document.getElementById('popup-time');
const popupWpm = document.getElementById('popup-wpm');
const popupAccuracy = document.getElementById('popup-accuracy');
const prevBtn = document.getElementById('prevParagraph');
const nextBtn = document.getElementById('nextParagraph');
const paragraphIndicator = document.getElementById('paragraphIndicator');

function renderQuote(quote, userInput = "") {
  quoteElement.innerHTML = "";
  for (let i = 0; i < quote.length; i++) {
    const span = document.createElement("span");
    span.textContent = quote[i];
    if (i < userInput.length) {
      if (userInput[i] === quote[i]) {
        span.className = "correct";
      } else {
        span.className = "incorrect";
      }
    } else {
      span.className = "";
    }
    quoteElement.appendChild(span);
  }
}

function loadParagraph(index) {
  renderQuote(paragraphs[index]);
  quoteInput.value = '';
  timerElement.textContent = '0';
  wpmElement.textContent = '0';
  accuracyElement.textContent = '100%';
  isTestRunning = false;
  clearInterval(interval);
  popup.classList.add('hidden');
  paragraphIndicator.textContent = `Paragraph ${index + 1} of ${paragraphs.length}`;
  startTime = 0;
}

function calculateAccuracy(input, quote) {
  let correct = 0;
  for (let i = 0; i < input.length && i < quote.length; i++) {
    if (input[i] === quote[i]) correct++;
  }
  return quote.length > 0 ? Math.round((correct / quote.length) * 100) : 100;
}

quoteInput.addEventListener('input', () => {
  const input = quoteInput.value;
  const quote = paragraphs[currentParagraph];
  renderQuote(quote, input);
  if (!isTestRunning && input.length > 0) {
    isTestRunning = true;
    startTime = Date.now();
    interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      timerElement.textContent = elapsed;
    }, 1000);
  }

  const elapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
  timerElement.textContent = elapsed;

  const wpm = elapsed > 0 ? Math.round((input.trim().split(/\s+/).length / elapsed) * 60) : 0;
  wpmElement.textContent = wpm;

  const accuracy = calculateAccuracy(input, quote);
  accuracyElement.textContent = `${accuracy}%`;

  if (input === quote) {
    clearInterval(interval);
    popupTime.textContent = elapsed;
    popupWpm.textContent = wpm;
    popupAccuracy.textContent = accuracy;
    popup.classList.remove('hidden');
    isTestRunning = false;
  }
});

function restartTest() {
  loadParagraph(currentParagraph);
}

prevBtn.addEventListener('click', () => {
  if (currentParagraph > 0) {
    currentParagraph--;
    loadParagraph(currentParagraph);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentParagraph < paragraphs.length - 1) {
    currentParagraph++;
    loadParagraph(currentParagraph);
  }
});

window.onload = () => {
  loadParagraph(currentParagraph);
};

window.restartTest = restartTest;