class User {
  constructor(username, firstName, lastName, email, age, password) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.age = age;
    this.password = password;
    this.shifts = [];
  }
}
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
const registrationBtn = document.getElementById("registrationBtn");
const registrationClearBtn = document.getElementById("registrationClearBtn");
const localStorageUsers = JSON.parse(localStorage.getItem("users")) || [];
const users = localStorageUsers;
const loggedIn = JSON.parse(localStorage.getItem("loggedIn")) || [];

function setLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}
console.log(users);
console.log(loggedIn);

if (loggedIn.length > 0) {
  window.location.replace("home.html");
}

registrationClearBtn.addEventListener("click", () => {
  registrationUsername.value = "";
  registrationFirstName.value = "";
  registrationLastName.value = "";
  registrationEmail.value = "";
  registrationAge.value = "";
  registrationPassword.value = "";
  registrationConfirmPassword.value = "";
});

registrationBtn.addEventListener("click", () => {
  let errors = [];
  if (registrationUsername.value.length < 6) {
    errors.push("User must have at least 6 characters");
  }
  if (users.some((user) => user.username === registrationUsername.value)) {
    errors.push("Username already exists");
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
  if (users.some((user) => user.email === registrationEmail.value)) {
    errors.push("Email already exists");
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
  let user = new User(
    registrationUsername.value,
    registrationFirstName.value,
    registrationLastName.value,
    registrationEmail.value,
    registrationAge.value,
    registrationPassword.value
  );
  users.push(user);
  setLocalStorage();

  registrationUsername.value = "";
  registrationFirstName.value = "";
  registrationLastName.value = "";
  registrationEmail.value = "";
  registrationAge.value = "";
  registrationPassword.value = "";
  registrationConfirmPassword.value = "";
  window.location.href = "index.html";
});

const registerBackToLogin = document.getElementById("registerBackToLogin");
registerBackToLogin.addEventListener("click", () => {
  window.location.href = "index.html";
});
