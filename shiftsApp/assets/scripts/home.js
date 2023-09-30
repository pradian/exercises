const loggedIn = JSON.parse(localStorage.getItem("loggedIn")) || [];

//If user is not logged in, redirect to index.html
if (loggedIn.length < 1) {
  window.location.href = "index.html";
}

const users = JSON.parse(localStorage.getItem("users")) || [];
const loggedInUser = users.find((user) => {
  return user.username === loggedIn[0];
});

//New shift button
const addShiftBtn = document.getElementById("addShiftBtn");
addShiftBtn.addEventListener("click", () => {
  window.location.href = "addShift.html";
});

// User welcome message
const welcomeUser = document.getElementById("welcomeUser");
if (loggedInUser) {
  welcomeUser.innerHTML = `Welcome, ${loggedInUser.firstName} ${loggedInUser.lastName}!`;
}

//User logout button
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  window.location.replace("index.html");
  console.log("Logged out");
});

// User profile button
const editProfile = document.getElementById("editProfile");
editProfile.addEventListener("click", () => {
  window.location.replace("profile.html");
});

const showShifts = document.querySelector("tbody");
showShifts.innerHTML = "";
loggedInUser.shifts.forEach((shift) => {
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${shift.name}</td>
  <td>${shift.startTime}</td>
  <td>${shift.endTime}</td>
  <td>${
    (new Date(shift.endTime) - new Date(shift.startTime)) / 1000 / 60 / 60
  }</td>
  <td>${shift.wage} $</td>
  <td>${shift.workplace}</td>
  <td>${shift.total} $</td></td>
`;
  showShifts.appendChild(row);
});
console.log(showShifts);
const bestMonth = document.getElementById("bestMonth");

const bestMonthShifts = loggedInUser.shifts.filter((shift) => {
  shift.date.split("-")[1];
  return shift.date.split("-")[1] === "05";
});
