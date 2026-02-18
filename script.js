async function generateTest() {

  const data = {
    subject: document.getElementById("subject").value,
    chapter: document.getElementById("chapter").value,
    topic: document.getElementById("topic").value,
    difficulty: document.getElementById("difficulty").value,
    n: parseInt(document.getElementById("n").value)
  };

  document.getElementById("output").innerHTML = "⏳ Generating JEE Level Questions...";

  const res = await fetch("https://YOUR-BACKEND-URL.onrender.com/generate-test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  let html = "";

  result.questions.forEach(q => {
    html += `
      <div class="qbox">
        <h3>Q${q.id}. ${q.question}</h3>
        <p>A. ${q.options[0]}</p>
        <p>B. ${q.options[1]}</p>
        <p>C. ${q.options[2]}</p>
        <p>D. ${q.options[3]}</p>
        <details>
          <summary>Solution</summary>
          <p>${q.solution}</p>
        </details>
      </div>
    `;
  });

  document.getElementById("output").innerHTML = html;
}
