let questions = [];
let index = 0;
let score = 0;

const backend = "https://jee-ai-platform.onrender.com"; // <-- PASTE YOUR RENDER URL

function generateTest() {
  const rank = document.getElementById("rank").value;

  fetch(`${backend}/generate/${rank}`)
    .then(res => res.json())
    .then(data => {
      questions = generateDummyQuestions(data.difficulty);
      document.getElementById("setup").classList.add("hidden");
      document.getElementById("test").classList.remove("hidden");
      loadQ();
    });
}

function generateDummyQuestions(diff) {
  let q = [];
  for (let i = 1; i <= 10; i++) {
    q.push({
      question: `${diff} level JEE Question ${i}`,
      options: ["Option A","Option B","Option C","Option D"],
      answer: Math.floor(Math.random()*4)
    });
  }
  return q;
}

function loadQ() {
  document.getElementById("qno").innerText = `Question ${
