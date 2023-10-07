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

// Show shifts table
const showShifts = document.querySelector("tbody");
const main = document.querySelector("main");
main.innerHTML = "";
if (loggedInUser.shifts.length === 0) {
  main.innerHTML = `<h4 style="text-align: center;"><strong>You have no shifts yet!</strong></h4>`;
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
  const div = document.createElement("div");
  div.innerHTML = `
  <p>Shift name:<span>${shift.name}</span></p>
  <p>Start stift:<span> ${formattedStartTime}</span></p>
  <p>End shift:<span> ${formattedEndTime}</span></p>
  <p>Hours worked:<span> ${Math.round(
    (new Date(shift.endTime) - new Date(shift.startTime)) / 1000 / 60 / 60
  )}</p>
  <p>Wage per hour:<span> ${shift.wage} $</span></p>
  <p>Shift workplace:<span> ${shift.workplace}</span></p>
  <p>Total wage:<span> ${shift.total} $</span></p>
`;
  div.style.cursor = "pointer";
  div.addEventListener("click", () => {
    window.location.href = `editshift.html?shiftId=${shift.name}`;
  });
  main.appendChild(div);
});
// Edit shifts
function editShift(shift) {
  console.log(shift);
}

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
  window.location.href = "home.html";
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

  main.innerHTML = "";
  if (searchedShifts.length === 0) {
    main.innerHTML = `<h3><strong>No shifts found!</strong></h3>`;
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
    const div = document.createElement("div");
    div.innerHTML = `
  <p>Shift name:<span>${shift.name}</span></p>
  <p>Start stift:<span> ${formattedStartTime}</span></p>
  <p>End shift:<span> ${formattedEndTime}</span></p>
  <p>Hours worked:<span> ${Math.round(
    (new Date(shift.endTime) - new Date(shift.startTime)) / 1000 / 60 / 60
  )}</p>
  <p>Wage per hour:<span> ${shift.wage} $</span></p>
  <p>Shift workplace:<span> ${shift.workplace}</span></p>
  <p>Total wage:<span> ${shift.total} $</span></p>
`;
    div.style.cursor = "pointer";
    div.addEventListener("click", () => {
      window.location.href = `editshift.html?shiftId=${shift.name}`;
    });
    main.appendChild(div);
  });
});

//Calculate best month
const showBestMonth = document.getElementById("showBestMonth");
function calculateBestMonth() {
  const monthsEarnings = [];
  sortedShifts.forEach((shift) => {
    const date = new Date(shift.date);
    const year = date.getFullYear();
    const month = date.getMonth();

    const existingMonth = monthsEarnings.find(
      (item) => item.year === year && item.month === month
    );

    if (existingMonth) {
      existingMonth.total += shift.total;
    } else {
      monthsEarnings.push({
        year: year,
        month: month,
        total: shift.total,
      });
    }
  });
  const sortedMonths = monthsEarnings.sort((a, b) => b.total - a.total);

  if (sortedMonths.length > 0) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    showBestMonth.innerHTML = `<h3><strong>Best Month is: ${
      monthNames[sortedMonths[0].month]
    } ${sortedMonths[0].year} with a total earnings of
    ${sortedMonths[0].total} $ </strong></h3>`;
  } else {
    main.innerHTML = `<h3><strong>No shifts found!</strong></h3>`;
  }
}
calculateBestMonth();
