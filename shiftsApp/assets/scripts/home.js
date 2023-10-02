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

const showShifts = document.querySelector("tbody");
showShifts.innerHTML = "";
if (loggedInUser.shifts.length === 0) {
  showShifts.innerHTML = `<tr><td colspan="7" style="text-align: center;"><strong>You have no shifts yet!</strong></td></tr>`;
}
loggedInUser.shifts.forEach((shift) => {
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

// // Calculate best month
// const showBestMonth = document.querySelector("tfoot");

// function calculateTotalPerMonth(shifts, year, month) {
//   return shifts.reduce((total, shift) => {
//     const shiftDate = new Date(shift.endTime);
//     if (shiftDate.getFullYear() === year && shiftDate.getMonth() === month) {
//       return total + shift.total;
//     }
//     return {total: total };
//   }, 0);
// }
// function calculateBestMonth(shifts) {
//   const bestMonth = {
//     month: 0,
//     year: 0,
//     total: 0,
//   };
//   for (let i = 0; i < 12; i++) {
//     const total = calculateTotalPerMonth(shifts, new Date().getFullYear(), i);
//     const monthName = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     if (total > bestMonth.total) {
//       bestMonth.month = monthName[i];
//       bestMonth.year = new Date().getFullYear();
//       bestMonth.total = total;
//     }
//   }
//   return {
//     month: bestMonth.month,
//     year: bestMonth.year,
//     total: bestMonth.total,
//   };
// }

// const tFootRow = document.createElement("tr");

// const bestMonth = calculateBestMonth(loggedInUser.shifts);

// tFootRow.innerHTML = `<th colspan="3">Best month:</th> <th colspan="2"> ${bestMonth.month} ${bestMonth.year}</th> <th colspan="2"> ${bestMonth.total}$</th>`;

// showBestMonth.appendChild(tFootRow);
