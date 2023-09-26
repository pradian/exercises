const homepage = document.getElementById("homepage");
const registrationForm = document.getElementById("registrationForm");
const loginForm = document.getElementById("loginForm");
const homeRegisterBtn = document.getElementById("homeRegisterBtn");
const homeLoginBtn = document.getElementById("homeLoginBtn");

homeRegisterBtn.addEventListener("click", () => {
  homepage.classList.toggle("hidden");
  registrationForm.classList.toggle("hidden");
});

homeLoginBtn.addEventListener("click", () => {
  homepage.classList.toggle("hidden");
  loginForm.classList.toggle("hidden");
});

const registrationUsername = document.getElementById("registrationUsername");
const registrationFirstName = document.getElementById("registrationFirstName");
const registrationLastName = document.getElementById("registrationLastName");
const registrationEmail = document.getElementById("registrationEmail");
const registrationAge = document.getElementById("registrationAge");
const registrationPassword = document.getElementById("registrationPassword");
const registrationConfirmPassword = document.getElementById(
  "registrationConfirmPassword"
);
const registrationBtn = document.getElementById("registrationBtn");
const registrationClearBtn = document.getElementById("registrationClearBtn");

class User {
  //   id: 0;
  constructor(username, firstName, lastName, email, age, password) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.age = age;
    this.password = password;
  }
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
  let user = new User(
    registrationUsername.value,
    registrationFirstName.value,
    registrationLastName.value,
    registrationEmail.value,
    registrationAge.value,
    registrationPassword.value
  );
  console.log(user);
});
