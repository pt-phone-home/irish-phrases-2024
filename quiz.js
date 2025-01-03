const quizFillerDiv = document.getElementById("quiz-filler");
const startQuiz = document.getElementById("startQuiz");
const quitQuiz = document.getElementById("quitQuiz");
const quizContainer = document.getElementById("quizContainer");
const irishPhrase = document.getElementById("irishPhrase");
const optionsDiv = document.getElementById("options");
const scorePage = document.getElementById("scorePage");
let currentQuiz = [];
let currentIndex = 0;
let score = 0;

function beginQuiz() {
  quizFillerDiv.classList.remove("d-block");
  quizFillerDiv.classList.add("d-none");
  scorePage.style.display = "none";
  startQuiz.classList.remove("d-inline-block");
  startQuiz.classList.add("d-none");
  quitQuiz.classList.remove("d-none");
  quitQuiz.classList.add("d-inline-block");
  document.getElementById("startQuizText").style.display = "none";
  document.getElementById("startQuizTextDescription").style.display = "none";
  quitQuiz.innerText = "Reset Quiz";
  getQuizPhrases();
}

async function getQuizPhrases() {
  const response = await fetch("./Phrases_2024_utf8.json");
  const phrases = await response.json();

  const a = Math.floor(Math.random() * phrases.length) + 1;
  const b = Math.floor(Math.random() * phrases.length) + 1;
  const c = Math.floor(Math.random() * phrases.length) + 1;
  const d = Math.floor(Math.random() * phrases.length) + 1;
  const e = Math.floor(Math.random() * phrases.length) + 1;
  const f = Math.floor(Math.random() * phrases.length) + 1;
  const g = Math.floor(Math.random() * phrases.length) + 1;
  const h = Math.floor(Math.random() * phrases.length) + 1;
  const i = Math.floor(Math.random() * phrases.length) + 1;
  const j = Math.floor(Math.random() * phrases.length) + 1;

  currentQuiz = [
    phrases[a],
    phrases[b],
    phrases[c],
    phrases[d],
    phrases[e],
    phrases[f],
    phrases[g],
    phrases[h],
    phrases[i],
    phrases[j],
  ];
  currentIndex = 0;
  score = 0;
  quizContainer.style.display = "block";
  displayQuestion();
}

function displayQuestion() {
  const phrase = currentQuiz[currentIndex];
  irishPhrase.textContent = phrase.irish;

  // Generate options
  const correctAnswer = phrase.english;
  const wrongAnswers = currentQuiz
    .filter((phrase) => {
      return phrase.english !== correctAnswer;
    })
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    .map((p) => p.english);

  const options = [correctAnswer, ...wrongAnswers].sort(
    () => 0.5 - Math.random()
  );

  optionsDiv.innerHTML = "";
  options.forEach((option) => {
    createOptionsButton(option, correctAnswer);
  });
}

function checkAnswer(selected, correct) {
  let buttons = document.getElementById("options").children;
  buttons = Array.from(buttons);
  if (selected === correct) {
    changeButtonsOnAnswer(buttons, correct);

    score++;
  } else {
    changeButtonsOnAnswer(buttons, correct);
  }

  currentIndex++;

  if (currentIndex < currentQuiz.length) {
    setTimeout(() => {
      displayQuestion();
    }, 2000);
  } else {
    setTimeout(() => {
      endQuiz();
    }, 2000);
  }
}

function changeButtonsOnAnswer(buttonsArray, correctAnswer) {
  buttonsArray.forEach((button) => {
    if (button.textContent === correctAnswer) {
      button.classList.remove("btn-outline-secondary");
      button.classList.remove("btn-outline");
      button.classList.add("btn-success");
    } else {
      button.classList.remove("btn-outline-secondary");
      button.classList.remove("btn-outline");
      button.classList.add("btn-danger");
    }
  });
}

function createOptionsButton(option, correctAnswer) {
  const button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("btn-outline");
  button.classList.add("btn-outline-secondary");
  button.classList.add("mb-2");

  button.textContent = option;
  button.addEventListener("click", () => checkAnswer(option, correctAnswer));
  optionsDiv.appendChild(button);
}

function endQuiz() {
  quizContainer.style.display = "none";
  scorePage.style.display = "block";
  quizFillerDiv.classList.remove("d-none");
  quizFillerDiv.classList.add("d-block");
  document.getElementById("score").textContent = score;
  quitQuiz.innerText = "Start again";
}

function closeQuiz() {
  currentQuiz = [];
  currentIndex = 0;
  score = 0;
  quizContainer.style.display = "none";
  scorePage.style.display = "none";
  startQuiz.classList.remove("d-none");
  startQuiz.classList.add("d-inline-block");
  quitQuiz.classList.add("d-none");
  quizFillerDiv.classList.remove("d-none");
  quizFillerDiv.classList.add("d-block");
  document.getElementById("startQuizText").style.display = "block";
  document.getElementById("startQuizTextDescription").style.display = "block";
}

// Event listeners
startQuiz.addEventListener("click", beginQuiz);
quitQuiz.addEventListener("click", closeQuiz);
