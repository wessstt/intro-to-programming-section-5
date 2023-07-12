const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const underZero = document.getElementById("under-zero");
const overHundred = document.getElementById("over-hundred");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("num-of-guesses");
const correctMessage = document.getElementById("correct");
const nonNumber = document.getElementById("not-a-number");

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts++;
  guessInput.value = "";
  resetButton.style.display = "";

  hideAllMessages();
  if (guess === targetNumber) {
    maxGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    maxGuessesMessage.style.display = "";
    correctMessage.style.display = "";
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      if (guess <= 0) {
        underZero.style.display = "";
      } else {
        tooLowMessage.style.display = "";
      }
    } else if (guess >= 100) {
      overHundred.style.display = "";
    } else {
      tooHighMessage.style.display = "";
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
    maxGuessesMessage.style.display = "";
    if (attempts <= 5) {
      maxGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    }
  }

  if (attempts === maxNumberOfAttempts) {
    for (let i = 0; i <= maxNumberOfAttempts.length; i++)
      maxNumberOfAttempts[i].style.display = "";
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = "";
  resetButton.style.display = "";
}

function hideAllMessages() {
  for (let i = 0; i < messages.length; i++) {
    messages[i].style.display = "none";
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = "none";
}

guessInput.addEventListener("change", (e) => {
  hideAllMessages();
  if (e.target.value <= 0) {
    underZero.style.display = "";
    submitButton.disabled = true;
  } else if (e.target.value >= 100) {
    overHundred.style.display = true;
  } else submitButton.disabled = false;
});

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
