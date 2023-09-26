const users = JSON.parse(localStorage.getItem("users")) || [];
const loggedIn = JSON.parse(localStorage.getItem("loggedIn")) || [];

const loggedInUser = users.find((user) => {
  return user.username === loggedIn[0];
});

//If user is not logged in, redirect to index.html
if (!loggedInUser) {
  window.location.href = "index.html";
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
  window.location.replace("index.html");
});

// User profile button
const editProfile = document.getElementById("editProfile");
editProfile.addEventListener("click", () => {
  window.location.replace("profile.html");
});
