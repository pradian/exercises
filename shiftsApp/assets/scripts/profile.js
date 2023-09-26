const registrationUsername = document.getElementById("registrationUsername");
const registrationFirstName = document.getElementById("registrationFirstName");
const registrationLastName = document.getElementById("registrationLastName");
const registrationEmail = document.getElementById("registrationEmail");
const registrationAge = document.getElementById("registrationAge");
const registrationPassword = document.getElementById("registrationPassword");
const registrationConfirmPassword = document.getElementById(
  "registrationConfirmPassword"
);
const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/;

const myShifts = document.getElementById("myShifts");
myShifts.addEventListener("click", () => {
  window.location.href = "home.html";
});

//Local storage
const localStorageUsers = JSON.parse(localStorage.getItem("users")) || [];
const users = localStorageUsers;
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

if (loggedInUser) {
  registrationUsername.value = loggedInUser.username;
  registrationFirstName.value = loggedInUser.firstName;
  registrationLastName.value = loggedInUser.lastName;
  registrationEmail.value = loggedInUser.email;
  registrationAge.value = loggedInUser.age;
  registrationPassword.value = loggedInUser.password;
  registrationConfirmPassword.value = loggedInUser.password;
}

// Profile edit button
const profileEditBtn = document.getElementById("profileEditBtn");

profileEditBtn.addEventListener("click", () => {
  let errors = [];
  if (registrationUsername.value.length < 6) {
    errors.push("User must have at least 6 characters");
  }

  if (registrationFirstName.value.length < 2) {
    errors.push("First name must have at least 2 characters");
  }
  if (registrationLastName.value.length < 2) {
    errors.push("Last name must have at least 2 characters");
  }
  if (registrationEmail.value.indexOf("@") === -1) {
    errors.push("Must provide a valid email address");
  }

  if (registrationAge.value < 18 || registrationAge.value > 65) {
    errors.push("Your age must be between 18 and 65 years old");
  }
  if (!pwdRegex.test(registrationPassword.value)) {
    errors.push(
      "Password must contain at least one lowercase letter, one uppercase letter, and one symbol (!@#$%^&*)"
    );
  }
  if (registrationPassword.value !== registrationConfirmPassword.value) {
    errors.push("Password and Confirm password must match");
  }

  if (errors.length > 0) {
    alert(errors.join("\n\n"));
    return;
  }
  loggedInUser.username = registrationUsername.value;
  loggedInUser.firstName = registrationFirstName.value;
  loggedInUser.lastName = registrationLastName.value;
  loggedInUser.email = registrationEmail.value;
  loggedInUser.age = registrationAge.value;
  loggedInUser.password = registrationPassword.value;

  localStorage.setItem("users", JSON.stringify(users));
  alert("Profile updated!");
  window.location.href = "home.html";
});
