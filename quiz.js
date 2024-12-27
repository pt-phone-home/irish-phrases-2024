const startQuiz = document.getElementById("startQuiz");
const quizContainer = document.getElementById("quizContainer");
const irishPhrase = document.getElementById("irishPhrase");
let currentQuiz = [];
let currentIndex = 0;
let score = 0;

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
  displayQuestions();
}

function displayQuestions() {
  const phrase = currentQuiz[currentIndex];
  irishPhrase.textContent = phrase.irish;

  // Generate options
  const correctAnswer = phrase.english;
}

// Event listeners
startQuiz.addEventListener("click", getQuizPhrases);
