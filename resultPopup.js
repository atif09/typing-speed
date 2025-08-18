function calculateAccuracy(input, quote) {
  let correct = 0;
  for (let i = 0; i < input.length && i < quote.length; i++) {
    if (input[i] === quote[i]) correct++;
  }
  return quote.length > 0 ? Math.round((correct / quote.length) * 100) : 100;
}

function showResultPopup() {
  const input = document.getElementById('quoteInput').value;
  const quote = document.getElementById('quote').innerText;
  const popup = document.getElementById('popup');
  const popupTime = document.getElementById('popup-time');
  const popupAccuracy = document.getElementById('popup-accuracy');


  let elapsed = parseInt(document.getElementById('timer').textContent, 10) || 0;
  const accuracy = calculateAccuracy(input, quote);

  popupTime.textContent = elapsed;
  popupAccuracy.textContent = accuracy;
  popup.classList.remove('hidden');
}

function closePopup() {
  document.getElementById('popup').classList.add('hidden');
}

window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('showResultBtn');
  if (btn) {
    btn.addEventListener('click', showResultPopup);
  }
  const closeBtn = document.getElementById('closePopupBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
  }
});