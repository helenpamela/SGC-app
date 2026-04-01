
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
  if (role) showApp();

  const currentPage = window.location.pathname.split("/").pop();

  const navMap = {
    "index.html": "nav-home",
    "monthly-theme.html": "nav-theme",
    "daily-inspiration.html": "nav-inspire",
    "events.html": "nav-events",
    "cliff-notes.html": "nav-cliff",
    "explore.html": "nav-explore",
    "memories.html": "nav-memories"
  };

  // Highlight main pages
  if (navMap[currentPage]) {
    const btn = document.querySelector("." + navMap[currentPage]);
    if (btn) btn.classList.add("active-nav");
  }

  // Highlight Cliff Notes for ALL subpages
  if (currentPage.startsWith("cn-")) {
    const cliffBtn = document.querySelector(".nav-cliff");
    if (cliffBtn) cliffBtn.classList.add("active-nav");
  }
});


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



