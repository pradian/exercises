// Shifts buttons

const myShifts = document.getElementById("myShifts");
myShifts.addEventListener("click", () => {
  window.location.href = "home.html";
});
const newShift = document.getElementById("newShift");
newShift.addEventListener("click", () => {
  window.location.href = "addShift.html";
});

// Local storage

const localStorageUsers = JSON.parse(localStorage.getItem("users")) || [];
const users = localStorageUsers;
const loggedIn = JSON.parse(localStorage.getItem("loggedIn")) || [];
const loggedInUser = users.find((user) => {
  return user.username === loggedIn[0];
});

// If user is not logged in, redirect to login page
if (!loggedInUser) {
  window.location.href = "index.html";
}

// User welcome message
const welcomeUser = document.getElementById("welcomeUser");
if (loggedInUser) {
  welcomeUser.innerHTML = `Welcome, ${loggedInUser.firstName} ${loggedInUser.lastName}!`;
}

//User buttons
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
});

const editProfile = document.getElementById("editProfile");
editProfile.addEventListener("click", () => {
  window.location.href = "profile.html";
});

// Add shift class and variables
class Shift {
  constructor(name, startTime, endTime, wage, workplace, notes) {
    this.name = name;
    this.date = startTime.toString().slice(0, 10);
    this.startTime = startTime;
    this.endTime = endTime;
    this.wage = wage;
    this.workplace = workplace;
    this.notes = notes;
    this.total =
      Math.round((new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60)) *
      wage;
  }
}
const addShiftName = document.getElementById("addShiftName");
// const addShiftDate = document.getElementById("addShiftDate");
const addShiftStartTime = document.getElementById("addShiftStartTime");
const addShiftEndTime = document.getElementById("addShiftEndTime");
const addShiftWage = document.getElementById("addShiftWage");
const addShiftWorkplace = document.getElementById("addShiftWorkplace");
const addShiftNotes = document.getElementById("addShiftNotes");
const addShiftBtn = document.getElementById("addShiftBtn");
const loadingImg = document.getElementById("loadingImg");

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

addShiftBtn.addEventListener("click", () => {
  let errors = [];
  if (addShiftName.value.length < 3) {
    errors.push("Name is too short");
  } else if (
    loggedInUser.shifts.some((shift) => shift.name === addShiftName.value)
  ) {
    errors.push("Name already exists");
  }
  // if (!addShiftDate.value) {
  //   errors.push("Date is required");
  // }
  if (!addShiftStartTime.value) {
    errors.push("Start time is required");
  }
  if (!addShiftEndTime.value) {
    errors.push("End time is required");
  }
  if (addShiftEndTime.value < addShiftStartTime.value) {
    errors.push("End time must be after start time");
  }
  if (!addShiftWage.value) {
    errors.push("Wage is required");
  }
  if (!addShiftWorkplace.value) {
    errors.push("Workplace is required");
  }
  console.log(errors);
  if (errors.length > 0) {
    alert(errors.join("\n\n"));
    return;
  }
  const shift = new Shift(
    addShiftName.value,
    addShiftStartTime.value,
    addShiftEndTime.value,
    addShiftWage.value,
    addShiftWorkplace.value,
    addShiftNotes.value
  );
  (addShiftName.disabled = true),
    (addShiftStartTime.disabled = true),
    (addShiftEndTime.disabled = true),
    (addShiftWage.disabled = true),
    (addShiftWorkplace.disabled = true),
    (addShiftNotes.disabled = true),
    (loadingImg.style.display = "block");
  setTimeout(() => {
    loggedInUser.shifts.push(shift);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Shift added!");
    window.location.href = "home.html";
  }, 2000);
});
