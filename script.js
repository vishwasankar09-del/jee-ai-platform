const syllabus = {

  Mathematics: {
    "Limits & Continuity": [
      "Limits using algebraic manipulation",
      "LHL and RHL problems",
      "Continuity and differentiability",
      "Graph based limits"
    ],

    "Differentiation": [
      "Tangent and normal",
      "Rate of change",
      "Maxima and minima",
      "Monotonicity",
      "Increasing and decreasing functions"
    ],

    "Integration": [
      "Indefinite integrals",
      "Definite integrals using properties",
      "Area under curve",
      "Improper integrals",
      "Differential equations"
    ],

    "Coordinate Geometry": [
      "Straight lines",
      "Circle",
      "Parabola",
      "Ellipse",
      "Hyperbola",
      "Locus problems",
      "Combined conic problems"
    ],

    "Vectors & 3D Geometry": [
      "Vector algebra",
      "Scalar and vector triple product",
      "Direction cosines",
      "Line and plane",
      "Shortest distance between two lines"
    ],

    "Algebra": [
      "Quadratic equations",
      "Complex numbers",
      "Permutations and combinations",
      "Binomial theorem",
      "Sequences and series",
      "Probability",
      "Matrices and determinants"
    ]
  },

  Physics: {
    "Kinematics": [
      "1D motion",
      "2D motion",
      "Projectile motion",
      "Relative velocity"
    ],

    "Laws of Motion": [
      "Newton's laws",
      "Friction",
      "Pulley problems",
      "Constraint motion"
    ],

    "Work Power Energy": [
      "Work energy theorem",
      "Conservation of energy",
      "Variable force",
      "Spring systems"
    ],

    "Rotational Mechanics": [
      "Torque and angular momentum",
      "Moment of inertia",
      "Rolling motion",
      "Rigid body dynamics"
    ],

    "Gravitation": [
      "Gravitational field",
      "Potential and escape velocity",
      "Satellite motion"
    ],

    "Electrostatics": [
      "Coulomb law",
      "Electric field and flux",
      "Gauss law",
      "Capacitors",
      "Dielectrics"
    ],

    "Current Electricity": [
      "Ohm law",
      "Kirchhoff laws",
      "Wheatstone bridge",
      "Potentiometer"
    ],

    "Magnetism & EMI": [
      "Biot Savart law",
      "Ampere law",
      "Electromagnetic induction",
      "AC circuits"
    ],

    "Optics": [
      "Ray optics",
      "Wave optics",
      "Interference",
      "Diffraction",
      "Polarization"
    ],

    "Modern Physics": [
      "Photoelectric effect",
      "Bohr model",
      "Nuclear physics",
      "Semiconductors"
    ]
  },

  Chemistry: {
    "Physical Chemistry": [
      "Mole concept",
      "Thermodynamics",
      "Chemical equilibrium",
      "Ionic equilibrium",
      "Electrochemistry",
      "Chemical kinetics",
      "Solutions",
      "Solid state",
      "Surface chemistry"
    ],

    "Organic Chemistry": [
      "General organic chemistry (GOC)",
      "Hydrocarbons",
      "Alkenes chemical properties",
      "Alkynes reactions",
      "Alkyl halides",
      "Alcohols phenols ethers",
      "Aldehydes and ketones",
      "Carboxylic acids",
      "Amines",
      "Biomolecules",
      "Polymers",
      "Practical organic chemistry"
    ],

    "Inorganic Chemistry": [
      "Periodic table",
      "Chemical bonding",
      "Coordination compounds",
      "p-block elements",
      "d and f block elements",
      "Metallurgy",
      "Salt analysis",
      "Qualitative analysis"
    ]
  }
};

const subjectSelect = document.getElementById("subject");
const chapterSelect = document.getElementById("chapter");
const topicSelect = document.getElementById("topic");

function loadChapters() {
  chapterSelect.innerHTML = "";
  topicSelect.innerHTML = "";

  const chapters = Object.keys(syllabus[subjectSelect.value]);

  chapters.forEach(ch => {
    const opt = document.createElement("option");
    opt.value = ch;
    opt.innerText = ch;
    chapterSelect.appendChild(opt);
  });

  loadTopics();
}

function loadTopics() {
  topicSelect.innerHTML = "";

  const topics = syllabus[subjectSelect.value][chapterSelect.value];

  topics.forEach(tp => {
    const opt = document.createElement("option");
    opt.value = tp;
    opt.innerText = tp;
    topicSelect.appendChild(opt);
  });
}

subjectSelect.addEventListener("change", loadChapters);
chapterSelect.addEventListener("change", loadTopics);

loadChapters();

async function generateTest() {

  const data = {
    subject: document.getElementById("subject").value,
    chapter: document.getElementById("chapter").value,
    topic: document.getElementById("topic").value,
    rank: parseInt(document.getElementById("rank").value),
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

let totalSeconds = 3 * 60 * 60;

function startTimer() {
  setInterval(() => {
    if (totalSeconds <= 0) return;

    totalSeconds--;

    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;

    document.getElementById("timer").innerText =
      `Time Left: ${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }, 1000);
}

startTimer();
