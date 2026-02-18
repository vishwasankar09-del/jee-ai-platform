let questions = [];
let current = 0;
let score = 0;

const backend = "https://jee-ai-platform.onrender.com"; // your backend

function generateTest() {
  const rank = document.getElementById("rank").value;

  if (!rank) {
    alert("Enter rank");
    return;
  }

  fetch(`${backend}/generate/${rank}`)
    .then(res => res.json())
    .then(data => {
      questions = makeQuestions(data.difficulty);
      document.getElementById("setup").classList.add("hidden");
      document.getElementById("test").classList.remove("hidden");
      showQ();
    })
    .catch(err => {
      alert("Backend error");
      console.log(err);
    });
}

function makeQuestions(diff) {
  let arr = [];
  for (let i = 1; i <= 10; i++) {
    arr.push({
      q: `${diff} JEE Question ${i}: If x=${i}, find 2x`,
      opts: [`${2*i}`, `${3*i}`, `${4*i}`, `${5*i}`],
      ans: 0
    });
  }
  return arr;
}

function showQ() {
  let q = questions[current];
  document.getElementById("qno").innerText = `Question ${current+1}`;
  document.getElementById("question").innerText = q.q;

  for (let i = 0; i < 4; i++) {
    document.getElementById("opt"+i).innerText = q.opts[i];
  }
}

function selectOption(i) {
  if (i === questions[current].ans) score++;
  current++;

  if (current < questions.length) {
    showQ();
  } else {
    document.getElementById("test").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("result").innerHTML =
      `<h2>Score: ${score}/${questions.length}</h2>`;
  }
}
