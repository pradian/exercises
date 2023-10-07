// Local storage

const localStorageUsers = JSON.parse(localStorage.getItem("users")) || [];
const users = localStorageUsers;
const loggedIn = JSON.parse(localStorage.getItem("loggedIn")) || [];
const loggedInUser = users.find((user) => {
  return user.username === loggedIn[0];
});

// If user is not logged in, redirect to login page
if (!loggedIn) {
  window.location.href = "index.html";
}

// All shifts button
const myShifts = document.getElementById("myShifts");
myShifts.addEventListener("click", () => {
  window.location.href = "home.html";
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
  window.location.href = "index.html";
});

// User profile button
const editProfile = document.getElementById("editProfile");
editProfile.addEventListener("click", () => {
  window.location.href = "profile.html";
});
// Edit shift variables
const urlParams = new URLSearchParams(window.location.search);
const shiftId = urlParams.get("shiftId");
const shiftToEdit = loggedInUser.shifts.find((shift) => shift.name === shiftId);
const editShiftName = document.getElementById("editShiftName");
const editShiftDate = document.getElementById("editShiftDate");
const editShiftStartTime = document.getElementById("editShiftStartTime");
const editShiftEndTime = document.getElementById("editShiftEndTime");
const editShiftWage = document.getElementById("editShiftWage");
const editShiftWorkplace = document.getElementById("editShiftWorkplace");
const editShiftNotes = document.getElementById("editShiftNotes");
const loadingImg = document.getElementById("loadingImg");

// Edit shift predefine values
if (shiftToEdit) {
  editShiftName.value = shiftToEdit.name;
  editShiftName.disabled = true;
  editShiftDate.value = shiftToEdit.date.toString().slice(0, 10);
  editShiftStartTime.value = shiftToEdit.startTime.toString().slice(0, 16);
  editShiftEndTime.value = shiftToEdit.endTime.toString().slice(0, 16);
  editShiftWage.value = shiftToEdit.wage;
  editShiftWorkplace.value = shiftToEdit.workplace;
  editShiftNotes.value = shiftToEdit.notes;
} else {
  window.location.href = "home.html";
}

// Edit shift button
const editShiftBtn = document.getElementById("editShiftBtn");

editShiftBtn.addEventListener("click", () => {
  let errors = [];
  if (!editShiftDate.value) {
    errors.push("Date is required");
  }
  if (!editShiftStartTime.value) {
    errors.push("Start time is required");
  }
  if (!editShiftEndTime.value) {
    errors.push("End time is required");
  }
  if (editShiftEndTime.value < editShiftStartTime.value) {
    errors.push("End time must be after start time");
  }
  if (!editShiftWage.value) {
    errors.push("Wage is required");
  }
  if (!editShiftWorkplace.value) {
    errors.push("Workplace is required");
  }
  if (errors.length > 0) {
    alert(errors.join("\n\n"));
    return;
  }
  loadingImg.style.display = "block";

  setTimeout(() => {
    if (shiftToEdit !== -1) {
      shiftToEdit.name = editShiftName.value;
      shiftToEdit.date = new Date(editShiftDate.value);
      shiftToEdit.startTime = new Date(editShiftStartTime.value);
      shiftToEdit.endTime = new Date(editShiftEndTime.value);
      shiftToEdit.wage = editShiftWage.value;
      shiftToEdit.workplace = editShiftWorkplace.value;
      shiftToEdit.notes = editShiftNotes.value;
      shiftToEdit.total =
        Math.round(
          (new Date(shiftToEdit.endTime) - new Date(shiftToEdit.startTime)) /
            (1000 * 60 * 60)
        ) * shiftToEdit.wage;
    }
    localStorage.setItem("users", JSON.stringify(users));
    alert("Shift updated!");
    window.location.href = "home.html";
  }, 3000);
});

// Delete shift button
const editShiftDeleteBtn = document.getElementById("editShiftDeleteBtn");
editShiftDeleteBtn.addEventListener("click", () => {
  const confirmDelete = confirm("Are you sure you want to delete this shift?");
  if (confirmDelete) {
    if (shiftToEdit !== -1) {
      loggedInUser.shifts.splice(shiftToEdit, 1);
    }
    localStorage.setItem("users", JSON.stringify(users));
    alert("Shift deleted!");
    window.location.href = "home.html";
  } else {
    alert("Shift not deleted!");
    return;
  }
});
