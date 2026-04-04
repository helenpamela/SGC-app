
const STUDENT_WORD = "circle";
const TEACHER_WORD = "luminary";
const currentPage = window.location.pathname.split("/").pop();

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
/*
// ALL OTHER PAGES → control Cliff Notes visibility
if (!cliffPages.includes(currentPage)) {
  if (cliffBtn) cliffBtn.style.display = "none";
}
  */


window.addEventListener("load", () => {
  const role = localStorage.getItem("role");
  if (role) showApp();

  const currentPage = window.location.pathname.split("/").pop();

  const navMap = {
    "index.html": "nav-home",
    "monthly.html": "nav-theme",
    "inspiration.html": "nav-inspire",
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

  if (document.getElementById("year")) {
    populateYears();
  }
});

const meetingsList = [
  {
    title: "March 2026",
    link: "meeting-2026-03.html",
    topics: ["gratitude", "new beginnings", "intentions"]
  },
  {
    title: "February 2026",
    link: "meeting-2026-01.html",
    topics: ["love", "relationships", "connection"]
  },
  {
    title: "March 2026",
    link: "meeting-2026-01.html",
    topics: ["growth", "change", "courage"]
  }
];


function populateYears() {
  const yearSelect = document.getElementById("year");
  const currentYear = new Date().getFullYear();

  for (let y = currentYear; y >= 2009; y--) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
}

function goToMeeting() {
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  const page = `meeting-${year}-${month}.html`;

  window.location.href = page;
}

function searchMeetings() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const results = document.getElementById("searchResults");

  results.innerHTML = "";

  const filtered = meetingsList.filter(meeting =>
    meeting.title.toLowerCase().includes(input) ||
    meeting.topics.some(topic => topic.includes(input))
  );
 filtered.forEach(meeting => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${meeting.link}">${meeting.title}</a>`;
    results.appendChild(li);
  });
}


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



