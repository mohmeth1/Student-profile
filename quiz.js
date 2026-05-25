const userName = localStorage.getItem('loggedInUser');
if (!userName) {
  window.location.href = 'index.html';
}

const quizKey = `${userName}_neoQuizProgress`;
const leaderboardKey = 'neoQuizLeaderboard';

const userLabel = document.getElementById('userLabel');
const headerUsername = document.getElementById('headerUsername');
const heroProgress = document.getElementById('heroProgress');
const totalQuestions = document.getElementById('totalQuestions');
const completedCount = document.getElementById('completedCount');
const bestScore = document.getElementById('bestScore');
const currentCategoryText = document.getElementById('currentCategoryText');
const currentDifficultyText = document.getElementById('currentDifficultyText');
const categoryGrid = document.getElementById('categoryGrid');
const startQuizBtn = document.getElementById('startQuizBtn');
const resumeBtn = document.getElementById('resumeBtn');
const newQuizBtn = document.getElementById('newQuizBtn');
const questionPanel = document.getElementById('questionPanel');
const selectionPanel = document.getElementById('selectionPanel');
const resultPanel = document.getElementById('resultPanel');
const leaderboardPanel = document.getElementById('leaderboardPanel');
const certificatePanel = document.getElementById('certificatePanel');
const dashboardPanel = document.getElementById('dashboardPanel');
const navLinks = document.querySelectorAll('.nav-link');
const questionIndex = document.getElementById('questionIndex');
const questionTotal = document.getElementById('questionTotal');
const questionText = document.getElementById('questionText');
const optionsGrid = document.getElementById('optionsGrid');
const timerText = document.getElementById('timerText');
const questionProgress = document.getElementById('questionProgress');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resultBadge = document.getElementById('resultBadge');
const resultScore = document.getElementById('resultScore');
const resultSubtitle = document.getElementById('resultSubtitle');
const correctCountEl = document.getElementById('correctCount');
const wrongCountEl = document.getElementById('wrongCount');
const unansweredCountEl = document.getElementById('unansweredCount');
const restartBtn = document.getElementById('restartBtn');
const viewCertificateBtn = document.getElementById('viewCertificateBtn');
const leaderboardGrid = document.getElementById('leaderboardGrid');
const certificateName = document.getElementById('certificateName');
const certificateSummary = document.getElementById('certificateSummary');
const certificateScore = document.getElementById('certificateScore');
const certificateStatus = document.getElementById('certificateStatus');
const certificateHomeBtn = document.getElementById('certificateHomeBtn');
const logoutBtn = document.getElementById('logoutBtn');
const quizToast = document.getElementById('quizToast');
const categoryButtons = [];
const difficultyButtons = document.querySelectorAll('.pill-btn');

let timerId = null;
let toastTimer = null;

const quizQuestions = [
  {
    question: 'What does HTML stand for?',
    options: ['HyperText Markup Language', 'HighText Machine Language', 'Hyperlink and Text Markup Language', 'Hyper Transfer Markup Language'],
    answer: 0,
    category: 'HTML/CSS',
    difficulty: 'Easy'
  },
  {
    question: 'Which tag adds a paragraph in HTML?',
    options: ['&lt;p&gt;', '&lt;div&gt;', '&lt;span&gt;', '&lt;header&gt;'],
    answer: 0,
    category: 'HTML/CSS',
    difficulty: 'Easy'
  },
  {
    question: 'Which element creates a clickable link?',
    options: ['&lt;a&gt;', '&lt;button&gt;', '&lt;link&gt;', '&lt;nav&gt;'],
    answer: 0,
    category: 'HTML/CSS',
    difficulty: 'Easy'
  },
  {
    question: 'Which CSS property changes text color?',
    options: ['color', 'font-size', 'background', 'margin'],
    answer: 0,
    category: 'HTML/CSS',
    difficulty: 'Easy'
  },
  {
    question: 'How do you select an element by id in CSS?',
    options: ['#myId', '.myId', 'myId', '*myId'],
    answer: 0,
    category: 'HTML/CSS',
    difficulty: 'Medium'
  },
  {
    question: 'Which property adds space inside an element?',
    options: ['padding', 'margin', 'border', 'width'],
    answer: 0,
    category: 'HTML/CSS',
    difficulty: 'Medium'
  },
  {
    question: 'Which tag defines the title shown in the browser tab?',
    options: ['&lt;title&gt;', '&lt;header&gt;', '&lt;head&gt;', '&lt;meta&gt;'],
    answer: 0,
    category: 'HTML/CSS',
    difficulty: 'Medium'
  },
  {
    question: 'What is the correct HTML element for the largest heading?',
    options: ['&lt;h1&gt;', '&lt;h6&gt;', '&lt;heading&gt;', '&lt;top&gt;'],
    answer: 0,
    category: 'HTML/CSS',
    difficulty: 'Hard'
  },
  {
    question: 'Which CSS property makes text bold?',
    options: ['font-weight', 'text-align', 'font-style', 'font-size'],
    answer: 0,
    category: 'HTML/CSS',
    difficulty: 'Hard'
  },
  {
    question: 'How do you group multiple selectors in CSS?',
    options: ['.btn, .link { }', '.btn .link { }', '.btn + .link { }', '.btn; .link { }'],
    answer: 0,
    category: 'HTML/CSS',
    difficulty: 'Hard'
  }
];

const categories = Array.from(new Set(quizQuestions.map((item) => item.category)));

const state = {
  selectedCategory: categories[0],
  selectedDifficulty: 'Easy',
  questions: [],
  currentIndex: 0,
  answers: [],
  time: 20,
  completed: false,
  score: 0,
  correct: 0,
  wrong: 0,
  unanswered: 0
};

function showToast(message) {
  quizToast.textContent = message;
  quizToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => quizToast.classList.remove('show'), 2600);
}

function saveProgress() {
  const payload = {
    selectedCategory: state.selectedCategory,
    selectedDifficulty: state.selectedDifficulty,
    questions: state.questions,
    currentIndex: state.currentIndex,
    answers: state.answers,
    time: state.time,
    completed: state.completed,
    score: state.score,
    correct: state.correct,
    wrong: state.wrong,
    unanswered: state.unanswered
  };
  localStorage.setItem(quizKey, JSON.stringify(payload));
}

function loadProgress() {
  const saved = JSON.parse(localStorage.getItem(quizKey));
  if (!saved) {
    return false;
  }
  Object.assign(state, saved);
  if (!Array.isArray(state.questions) || state.questions.length === 0) {
    return false;
  }
  return !state.completed;
}

function clearProgress() {
  localStorage.removeItem(quizKey);
}

function setActivePanel(panelId) {
  document.querySelectorAll('.panel-section').forEach((panel) => {
    panel.classList.toggle('active-panel', panel.id === panelId);
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.panel === panelId);
  });
}

function renderProfile() {
  userLabel.textContent = userName;
  headerUsername.textContent = userName;
}

function renderSummary() {
  const savedResults = JSON.parse(localStorage.getItem('quizResults')) || [];
  const best = savedResults.reduce((max, item) => Math.max(max, item.score), 0);
  totalQuestions.textContent = quizQuestions.length;
  completedCount.textContent = savedResults.length;
  bestScore.textContent = `${best}%`;
  heroProgress.textContent = `${state.completed ? Math.round(state.score) : 0}%`;
  currentCategoryText.textContent = `Category: ${state.selectedCategory}`;
  currentDifficultyText.textContent = `Difficulty: ${state.selectedDifficulty}`;
}

function buildCategoryCards() {
  categoryGrid.innerHTML = '';
  categories.forEach((category) => {
    const card = document.createElement('button');
    card.className = 'category-card';
    card.type = 'button';
    card.innerHTML = `<h3>${category}</h3><p>${quizQuestions.filter((item) => item.category === category).length} questions</p>`;
    card.addEventListener('click', () => {
      state.selectedCategory = category;
      document.querySelectorAll('.category-card').forEach((node) => node.classList.remove('active'));
      card.classList.add('active');
      showToast(`${category} selected`);
    });
    if (category === state.selectedCategory) {
      card.classList.add('active');
    }
    categoryGrid.appendChild(card);
  });
}

function buildDifficultyButtons() {
  difficultyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      difficultyButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      state.selectedDifficulty = button.dataset.difficulty;
      showToast(`${state.selectedDifficulty} difficulty selected`);
    });
  });
}

function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function prepareQuiz() {
  const filtered = quizQuestions.filter((item) => item.category === state.selectedCategory && item.difficulty === state.selectedDifficulty);
  const questionCount = Math.max(filtered.length, 4);
  state.questions = shuffleArray(filtered).slice(0, questionCount);
  if (state.questions.length === 0) {
    showToast('No questions found for that category/difficulty. Choose another combo.');
    return false;
  }
  state.currentIndex = 0;
  state.answers = Array(state.questions.length).fill(null);
  state.time = 20;
  state.completed = false;
  state.score = 0;
  state.correct = 0;
  state.wrong = 0;
  state.unanswered = 0;
  saveProgress();
  return true;
}

function renderQuestion() {
  const current = state.questions[state.currentIndex];
  questionIndex.textContent = state.currentIndex + 1;
  questionTotal.textContent = state.questions.length;
  questionText.textContent = current.question;
  optionsGrid.innerHTML = '';

  current.options.forEach((option, index) => {
    const card = document.createElement('button');
    card.className = 'option-card';
    card.type = 'button';
    card.innerHTML = `<span>${option}</span>`;
    const selected = state.answers[state.currentIndex];
    if (selected !== null) {
      if (index === current.answer) card.classList.add('correct');
      if (index === selected && selected !== current.answer) card.classList.add('wrong');
      if (index === selected) card.classList.add('selected');
    }
    card.addEventListener('click', () => selectOption(index));
    optionsGrid.appendChild(card);
  });

  questionProgress.style.width = `${((state.currentIndex + 1) / state.questions.length) * 100}%`;
  prevBtn.disabled = state.currentIndex === 0;
  nextBtn.textContent = state.currentIndex === state.questions.length - 1 ? 'Finish' : 'Next';
  timerText.textContent = `${state.time}s`;
  startTimer();
}

function selectOption(optionIndex) {
  const current = state.questions[state.currentIndex];
  state.answers[state.currentIndex] = optionIndex;
  saveProgress();
  renderQuestion();
}

function startTimer() {
  clearInterval(timerId);
  timerText.textContent = `${state.time}s`;
  timerId = setInterval(() => {
    state.time -= 1;
    if (state.time <= 0) {
      clearInterval(timerId);
      showToast('Time expired. Moving to next question.');
      if (state.answers[state.currentIndex] === null) {
        state.answers[state.currentIndex] = -1;
      }
      state.time = 0;
      saveProgress();
      setTimeout(nextQuestion, 500);
      return;
    }
    timerText.textContent = `${state.time}s`;
    saveProgress();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
}

function nextQuestion() {
  if (state.currentIndex < state.questions.length - 1) {
    state.currentIndex += 1;
    state.time = 20;
    saveProgress();
    renderQuestion();
  } else {
    completeQuiz();
  }
}

function prevQuestion() {
  if (state.currentIndex > 0) {
    state.currentIndex -= 1;
    state.time = 20;
    saveProgress();
    renderQuestion();
  }
}

function calculateResults() {
  state.correct = 0;
  state.wrong = 0;
  state.unanswered = 0;
  state.questions.forEach((question, index) => {
    const answer = state.answers[index];
    if (answer === question.answer) state.correct += 1;
    else if (answer === null || answer === -1) state.unanswered += 1;
    else state.wrong += 1;
  });
  state.score = state.questions.length ? (state.correct / state.questions.length) * 100 : 0;
}

function completeQuiz() {
  stopTimer();
  calculateResults();
  state.completed = true;
  saveProgress();
  showResultScreen();
  updateLeaderboard();
}

function showResultScreen() {
  const percent = Math.round(state.score);
  resultBadge.textContent = percent >= 60 ? 'Passed' : 'Failed';
  resultBadge.style.background = percent >= 60 ? 'rgba(69, 245, 168, 0.18)' : 'rgba(255, 123, 114, 0.18)';
  resultBadge.style.color = percent >= 60 ? 'var(--success)' : 'var(--warn)';
  resultScore.textContent = `${percent}%`;
  resultSubtitle.textContent = percent >= 60 ? 'Excellent work! Your skills are growing.' : 'Keep going — you can improve on the next attempt.';
  correctCountEl.textContent = state.correct;
  wrongCountEl.textContent = state.wrong;
  unansweredCountEl.textContent = state.unanswered;
  certificateName.textContent = userName;
  certificateScore.textContent = `${percent}%`;
  certificateStatus.textContent = percent >= 60 ? 'Passed' : 'Needs practice';
  certificateSummary.textContent = percent >= 60 ? 'You completed the NeoQuiz challenge successfully.' : 'Review the quiz topics and try again for a higher score.';
  setActivePanel('resultPanel');
  heroProgress.textContent = `${percent}%`;
}

function updateLeaderboard() {
  const results = JSON.parse(localStorage.getItem('quizResults')) || [];
  const score = Math.round(state.score);
  const record = {
    user: userName,
    score,
    category: state.selectedCategory,
    difficulty: state.selectedDifficulty,
    date: new Date().toLocaleDateString()
  };
  const existing = results.find((item) => item.user === userName && item.category === state.selectedCategory && item.difficulty === state.selectedDifficulty);
  if (existing) {
    existing.score = Math.max(existing.score, score);
    existing.date = record.date;
  } else {
    results.push(record);
  }
  localStorage.setItem('quizResults', JSON.stringify(results));
  renderLeaderboard();
}

function renderLeaderboard() {
  const results = JSON.parse(localStorage.getItem('quizResults')) || [];
  const sorted = results.sort((a, b) => b.score - a.score).slice(0, 6);
  leaderboardGrid.innerHTML = '';
  if (sorted.length === 0) {
    leaderboardGrid.innerHTML = '<div class="leaderboard-card glass-card"><p>No results yet. Complete a quiz to see leaderboard stats.</p></div>';
    return;
  }
  sorted.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'leaderboard-card glass-card';
    card.innerHTML = `<h3>#${index + 1} ${item.user}</h3><p>Score: ${item.score}%</p><p>${item.category} · ${item.difficulty}</p><p>${item.date}</p>`;
    leaderboardGrid.appendChild(card);
  });
}

function showSelectionPanel() {
  setActivePanel('selectionPanel');
}

function loadSavedQuiz() {
  const hasProgress = loadProgress();
  if (!hasProgress) {
    resumeBtn.disabled = true;
    resumeBtn.textContent = 'No Resume Available';
    return;
  }
  resumeBtn.disabled = false;
  resumeBtn.textContent = 'Resume Quiz';
}

function bindEvents() {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setActivePanel(link.dataset.panel);
      if (link.dataset.panel === 'leaderboardPanel') {
        renderLeaderboard();
      }
      if (link.dataset.panel === 'dashboardPanel') {
        renderSummary();
      }
    });
  });

  startQuizBtn.addEventListener('click', () => {
    if (!prepareQuiz()) return;
    setActivePanel('questionPanel');
    renderQuestion();
  });

  resumeBtn.addEventListener('click', () => {
    if (!loadProgress()) {
      showToast('No resumable quiz found. Start a new challenge.');
      return;
    }
    setActivePanel('questionPanel');
    renderQuestion();
    showToast('Resuming your previous quiz');
  });

  newQuizBtn.addEventListener('click', () => {
    clearProgress();
    state.selectedCategory = categories[0];
    state.selectedDifficulty = 'Easy';
    document.querySelectorAll('.category-card').forEach((node) => node.classList.toggle('active', node.querySelector('h3').textContent === state.selectedCategory));
    difficultyButtons.forEach((button) => button.classList.toggle('active', button.dataset.difficulty === state.selectedDifficulty));
    renderSummary();
    setActivePanel('selectionPanel');
    showToast('Ready for a fresh quiz');
  });

  prevBtn.addEventListener('click', prevQuestion);
  nextBtn.addEventListener('click', nextQuestion);
  restartBtn.addEventListener('click', () => {
    clearProgress();
    showSelectionPanel();
    showToast('Quiz reset. Choose a new category.');
  });

  viewCertificateBtn.addEventListener('click', () => {
    setActivePanel('certificatePanel');
  });

  certificateHomeBtn.addEventListener('click', () => {
    setActivePanel('dashboardPanel');
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
  });
}

function init() {
  renderProfile();
  renderSummary();
  buildCategoryCards();
  buildDifficultyButtons();
  renderLeaderboard();
  loadSavedQuiz();
  bindEvents();
}

init();
