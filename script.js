const syllabus = {
  Mathematics: {
    "Limits & Continuity": [
      "Algebraic limits",
      "LHL RHL problems",
      "Continuity and differentiability"
    ],
    "Differentiation": [
      "Tangent and normal",
      "Maxima minima",
      "Rate of change",
      "Monotonicity"
    ],
    "Integration": [
      "Definite integrals using properties",
      "Area under curve",
      "Improper integrals"
    ],
    "Coordinate Geometry": [
      "Straight line locus problems",
      "Circle & parabola combined locus",
      "Ellipse & hyperbola tangents"
    ]
  },

  Physics: {
    "Electrostatics": [
      "Gauss law applications",
      "Field due to continuous charge",
      "Capacitors with dielectric",
      "Energy stored in capacitor"
    ],
    "Current Electricity": [
      "Kirchhoff laws",
      "Wheatstone bridge",
      "Potentiometer numericals"
    ],
    "Rotational Mechanics": [
      "Rolling motion",
      "Angular momentum conservation",
      "Rigid body dynamics"
    ]
  },

  Chemistry: {
    "Organic Chemistry": [
      "Chemical properties of alkenes",
      "Reaction mechanism of alkyl halides",
      "Carbonyl compounds multi-step reactions",
      "Amines reactions and preparation"
    ],
    "Physical Chemistry": [
      "Electrochemistry numericals",
      "Thermodynamics Gibbs free energy",
      "Chemical kinetics rate laws",
      "Colligative properties"
    ],
    "Inorganic Chemistry": [
      "Coordination compounds isomerism",
      "Chemical bonding MOT",
      "d-block trends",
      "Salt analysis logic"
    ]
  }
};

async function generateTest() {

  const data = {
    subject: document.getElementById("subject").value,
    chapter: document.getElementById("chapter").value,
    topic: document.getElementById("topic").value,
    difficulty: document.getElementById("difficulty").value,
    n: parseInt(document.getElementById("n").value)
  };

  document.getElementById("output").innerHTML = "⏳ Generating JEE Level Questions...";

  const res = await fetch("https://https://jee-ai-platform.onrender.com//generate-test", {
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
