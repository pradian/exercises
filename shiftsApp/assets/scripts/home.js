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
  window.location.href = "index.html";
});

// User profile button
const editProfile = document.getElementById("editProfile");
editProfile.addEventListener("click", () => {
  window.location.href = "profile.html";
});
//Show shifts
const showShifts = document.querySelector("tbody");
showShifts.innerHTML = "";
if (loggedInUser.shifts.length === 0) {
  showShifts.innerHTML = `<tr><td colspan="7" style="text-align: center;"><strong>You have no shifts yet!</strong></td></tr>`;
}
const sortedShifts = loggedInUser.shifts.sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});
sortedShifts.forEach((shift) => {
  const startTime = new Date(shift.startTime);
  const endTime = new Date(shift.endTime);

  const formattedStartTime = `${startTime.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })}, ${startTime.getHours()}:${String(startTime.getMinutes()).padStart(
    2,
    "0"
  )}`;
  const formattedEndTime = `${endTime.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })}, ${endTime.getHours()}:${String(endTime.getMinutes()).padStart(2, "0")}`;
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${shift.name}</td>
  <td>${formattedStartTime}</td>
  <td>${formattedEndTime}</td>
  <td>${
    (new Date(shift.endTime) - new Date(shift.startTime)) / 1000 / 60 / 60
  }</td>
  <td>${shift.wage} $</td>
  <td>${shift.workplace}</td>
  <td>${shift.total} $</td></td>
`;

  row.addEventListener("click", () => {
    window.location.href = `editshift.html?shiftId=${shift.name}`;
  });
  showShifts.appendChild(row);
});

//Search shifts by Shift name , from , to. If one is null will not be included
const searchShiftsName = document.getElementById("searchShiftsName");
const searchShiftsFromDate = document.getElementById("searchShiftsFromDate");
const searchShiftsToDate = document.getElementById("searchShiftsToDate");
const searchShiftsBtn = document.getElementById("searchShiftsBtn");
const searchShiftsClearBtn = document.getElementById("searchShiftsClearBtn");

searchShiftsClearBtn.addEventListener("click", () => {
  searchShiftsName.value = "";
  searchShiftsFromDate.value = "";
  searchShiftsToDate.value = "";
});

searchShiftsBtn.addEventListener("click", () => {
  const searchedShifts = sortedShifts.filter((shift) => {
    const nameMatch = searchShiftsName.value
      ? shift.name.toLowerCase().includes(searchShiftsName.value.toLowerCase())
      : true;
    const fromDateMatch = searchShiftsFromDate.value
      ? new Date(shift.date) >= new Date(searchShiftsFromDate.value)
      : true;
    const toDateMatch = searchShiftsToDate.value
      ? new Date(shift.date) <= new Date(searchShiftsToDate.value)
      : true;
    return nameMatch && fromDateMatch && toDateMatch;
  });

  showShifts.innerHTML = "";
  if (searchedShifts.length === 0) {
    showShifts.innerHTML = `<tr><td colspan="7" style="text-align: center;"><strong>No shifts found!</strong></td></tr>`;
  }
  searchedShifts.forEach((shift) => {
    const startTime = new Date(shift.startTime);
    const endTime = new Date(shift.endTime);
    const formattedStartTime = `${startTime.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })}, ${startTime.getHours()}:${String(startTime.getMinutes()).padStart(
      2,
      "0"
    )}`;
    const formattedEndTime = `${endTime.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })}, ${endTime.getHours()}:${String(endTime.getMinutes()).padStart(
      2,
      "0"
    )}`;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${shift.name}</td>
      <td>${formattedStartTime}</td>
      <td>${formattedEndTime}</td>
      <td>${(endTime - startTime) / 1000 / 60 / 60}</td>
      <td>${shift.wage} $</td>
      <td>${shift.workplace}</td>
      <td>${shift.total} $</td>
    `;

    showShifts.appendChild(row);
  });
});

// Calculate best month
const showBestMonth = document.querySelector("tfoot");
