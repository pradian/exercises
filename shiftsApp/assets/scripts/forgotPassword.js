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
// If don`t have an account
const register = document.getElementById("register");
register.addEventListener("click", () => {
  window.location.href = "register.html";
});

const newPwdUsername = document.getElementById("newPwdUsername");
const newPwdEmail = document.getElementById("newPwdEmail");
const newPwdPassword = document.getElementById("newPwdPassword");
const newPwdConfirmPassword = document.getElementById("newPwdConfirmPassword");
const newPwdBtn = document.getElementById("newPwdBtn");

newPwdBtn.addEventListener("click", () => {
  if (newPwdPassword.value !== newPwdConfirmPassword.value) {
    alert("Passwords don`t match. Please re-enter the password.");
    return;
  }
  const userToReset = users.find(
    (user) =>
      user.username === newPwdUsername.value && user.email === newPwdEmail.value
  );
  if (!userToReset) {
    alert("User not found. Please check your username and email.");
    return;
  }
  userToReset.password = newPwdPassword.value;
  localStorage.setItem("users", JSON.stringify(users));
  alert("You successfuly reset your password! \n You can log in now.");
  window.location.href = "index.html";
});
