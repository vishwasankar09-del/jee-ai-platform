let questions = [];
let current = 0;
let score = 0;

const backend = "https://jee-ai-platform.onrender.com"; // your backend

function generateTest() {
  const rank = document.getElementById("rank").value;

  if (!rank) {
    alert("Enter target rank");
    return;
  }

  fetch(`${backend}/generate/${rank}`)
    .then(res => res.json())
    .then(data => {
      questions = createQuestions(data.difficulty);
      document.getElementById("setup").classList.add("hidden");
      document.getElementById("test").classList.remove("hidden");
      showQuestion();
    })
    .catch(err => {
      alert("Backend connection failed");
      console.error(err);
    });
}

function createQuestions(diff) {
  let q = [];
  for (let i = 1; i <= 10; i++) {
    q.push({
      question: `${diff} level JEE Question ${i}: What is the value of x?`,
      options: [
        `${i}`,
        `${i * 2}`,
        `${i * 3}`,
        `${i * 4}`
      ],
      answer: Math.floor(Math.random() * 4)
    });
  }
  return q;
}

function showQuestion() {
  let q = questions[current];

  document.getElementById("qno").innerText = `Question ${current + 1} / ${questions.length}`;
  document.getElementById("question").innerText = q.question;

  for (let i = 0; i < 4; i++) {
    document.getElementById("opt" + i).innerText = q.options[i];
  }
}

function selectOption(opt) {
  if (opt === questions[current].answer) score++;
  nextQ();
}

function nextQ() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    submitTest();
  }
}

function prevQ() {
  if (current > 0) {
    current--;
    showQuestion();
  }
}

function submitTest() {
  document.getElementById("test").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("result").innerHTML = `
    <h2>Test Completed</h2>
    <h3>Score: ${score} / ${questions.length}</h3>
    <p>Accuracy: ${Math.round((score / questions.length) * 100)}%</p>
  `;
}
