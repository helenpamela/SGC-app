
const STUDENT_WORD = "circle";
const TEACHER_WORD = "luminary";

function checkAccess() {
  const input = document.getElementById("accessInput").value;

  if (input === STUDENT_WORD) {
    localStorage.setItem("role", "student");
    showApp();

  } else if (input === TEACHER_WORD) {
    localStorage.setItem("role", "teacher");
    showApp();

  } else {
    document.getElementById("errorMsg").style.display = "block";
  }
}

function showApp() {
  const login = document.getElementById("loginScreen");
  const app = document.getElementById("appContent");

  if (login && app) {
    login.style.display = "none";
    app.style.display = "block";
  }

  applyPermissions();
}

function applyPermissions() {
  const role = localStorage.getItem("role");
  const teacherSections = document.querySelectorAll(".teacher-only");

  teacherSections.forEach(section => {
    section.style.display = (role === "teacher") ? "block" : "none";
  });
}



// HOME PAGE → only Logout
if (currentPage === "index.html" || currentPage === "") {
  if (homeBtn) homeBtn.style.display = "none";
}

// CLIFF NOTES MAIN PAGE → hide Cliff Notes button
if (currentPage === "cliff-notes.html") {
  if (cliffBtn) cliffBtn.style.display = "none";
}

// ALL OTHER PAGES → control Cliff Notes visibility
if (!cliffPages.includes(currentPage)) {
  if (cliffBtn) cliffBtn.style.display = "none";
}

window.addEventListener("load", () => {
  const role = localStorage.getItem("role");

  if (role) {
    showApp();
  }

  const currentPage = window.location.pathname.split("/").pop();
  const homeBtn = document.querySelector(".nav-home");
  const cliffBtn = document.querySelector(".nav-cliff");

  const cliffPages = [
    "cn-sacred-pages.html",
    "cn-first-aid.html",
    "cn-daily-practices.html",
    "cn-concepts.html",
    "cn-tools.html",
    "cn-forms.html",
    "cn-resources.html"
  ];

  // HOME PAGE → only Logout
  if (currentPage === "index.html" || currentPage === "") {
    if (homeBtn) homeBtn.style.display = "none";
  }

  // CLIFF NOTES MAIN PAGE → hide Cliff Notes
  if (currentPage === "cliff-notes.html") {
    if (cliffBtn) cliffBtn.style.display = "none";
  }

  // ALL OTHER PAGES → hide Cliff unless in allowed list
  if (!cliffPages.includes(currentPage)) {
    if (cliffBtn) cliffBtn.style.display = "none";
  }
})


function logout() {
  localStorage.removeItem("role");

  const app = document.getElementById("appContent");
  const login = document.getElementById("loginScreen");

  if (app && login) {
    app.style.display = "none";
    login.style.display = "flex";
  } else {
    window.location.href = "index.html";
  }
}



