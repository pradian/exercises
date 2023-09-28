// All shifts button

const myShifts = document.getElementById("myShifts");
myShifts.addEventListener("click", () => {
  window.location.href = "home.html";
});

// Local storage

const localStorageUsers = JSON.parse(localStorage.getItem("users")) || [];
const users = localStorageUsers;
const loggedIn = JSON.parse(localStorage.getItem("loggedIn")) || [];
const loggedInUser = users.find((user) => {
  return user.username === loggedIn[0];
});

// If user is not logged in, redirect to login page
if (loggedIn.length < 1) {
  window.location.href = "home.html";
}

// User welcome message
const welcomeUser = document.getElementById("welcomeUser");
if (loggedInUser) {
  welcomeUser.innerHTML = `Welcome, ${loggedInUser.firstName} ${loggedInUser.lastName}!`;
}

//User logout button
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
});

// User profile button
const editProfile = document.getElementById("editProfile");
editProfile.addEventListener("click", () => {
  window.location.href = "profile.html";
});

// Add shift class and variables
class Shift {
  constructor(name, date, startTime, endTime, wage, workplace, notes) {
    this.name = name;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.wage = wage;
    this.workplace = workplace;
    this.notes = notes;
    this.total = parseInt(
      ((new Date(this.endTime) - new Date(this.startTime)) / 1000) *
        60 *
        this.wage
    );
  }
}
const addShiftName = document.getElementById("addShiftName");
const addShiftDate = document.getElementById("addShiftDate");
const addShiftStartTime = document.getElementById("addShiftStartTime");
const addShiftEndTime = document.getElementById("addShiftEndTime");
const addShiftWage = document.getElementById("addShiftWage");
const addShiftWorkplace = document.getElementById("addShiftWorkplace");
const addShiftNotes = document.getElementById("addShiftNotes");

// Clear shift form
const addShiftClearBtn = document.getElementById("addShiftClearBtn");
addShiftClearBtn.addEventListener("click", () => {
  addShiftName.value = "";
  addShiftDate.value = "";
  addShiftStartTime.value = "";
  addShiftEndTime.value = "";
  addShiftWage.value = "";
  addShiftWorkplace.value = "";
  addShiftNotes.value = "";
});

// Add shift button
const addShiftBtn = document.getElementById("addShiftBtn");

addShiftBtn.addEventListener("click", () => {
  const shift = new Shift(
    addShiftName.value,
    addShiftDate.value,
    addShiftStartTime.value,
    addShiftEndTime.value,
    addShiftWage.value,
    addShiftWorkplace.value,
    addShiftNotes.value
  );
  loggedInUser.shifts.push(shift);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "home.html";
});
