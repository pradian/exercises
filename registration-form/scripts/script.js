const registerTab = document.getElementById("registerTab");
const loginTab = document.getElementById("loginTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const clearBtn = document.getElementById("clearBtn");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");
const confirmPassword = document.getElementById("confirmPassword");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const registered = document.getElementById("registered");
const logged = document.getElementById("logged");
const persons = JSON.parse(localStorage.getItem("personData")) || [];
const showPwd = document.getElementById("showPassword");
const nameRegex = /^[a-zA-Z ]{2,30}$/;
const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

/* The code is adding an event listener to the `registerTab` element. When the element is clicked, the
function inside the arrow function is executed. */
registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  loginForm.classList.add("hide");
  registerForm.classList.remove("hide");
  registered.classList.add("hide");
  logged.classList.add("hide");
});
/* This code is adding an event listener to the `loginTab` element. When the element is clicked, the
function inside the arrow function is executed. */
loginTab.addEventListener("click", () => {
  registerTab.classList.remove("active");
  loginTab.classList.add("active");
  loginForm.classList.remove("hide");
  registerForm.classList.add("hide");
  registered.classList.add("hide");
  logged.classList.add("hide");
});
/* The code is adding an event listener to the `clearBtn` element. When the button is clicked, the
function inside the arrow function is executed. This function sets the value of the `firstName`,
`lastName`, `regEmail`, `regPassword`, and `confirmPassword` elements to an empty string,
effectively clearing the input fields. */
clearBtn.addEventListener("click", () => {
  firstName.value = "";
  lastName.value = "";
  regEmail.value = "";
  regPassword.value = "";
  confirmPassword.value = "";
  console.log("Clear button clicked");
});

loginBtn.addEventListener("click", () => {
  for (let key of persons) {
    console.log(
      key.email === loginEmail.value && key.password === loginPassword.value
    );

    if (
      key.email !== loginEmail.value &&
      key.password !== loginPassword.value
    ) {
      alert("Email or password incorrect. Please try again");
      return;
    } else {
      loginForm.classList.add("hide");
      logged.classList.remove("hide");
    }
  }
  loginEmail.value = "";
  loginPassword.value = "";
});

showPwd.addEventListener("click", () => {
  showPwd.checked == true
    ? (loginPassword.type = "text")
    : (loginPassword.type = "password");
});

registerBtn.addEventListener("click", () => {
  if (!nameRegex.test(firstName.value)) {
    alert("Please enter your first name");
    return;
  }
  if (!nameRegex.test(lastName.value)) {
    alert("Please enter your last name");
    return;
  }
  if (!emailRegex.test(regEmail.value)) {
    alert("Please enter your email");
    return;
  }
  for (let key of persons) {
    if (key.email === regEmail.value) {
      alert("This email is already being used");
      return;
    }
  }

  if (!passwordPattern.test(regPassword.value)) {
    alert(
      "Your password is invalid. \n Please enter a secure password. \n You neet atleast: \n  - one number \n  - one uppercase letter \n  - one lowercase letter \n  - one speial character @$!%*#?& \n  - minimum 8 characters"
    );
    return;
  }
  if (regPassword.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  persons.push({
    firstName: firstName.value,
    lastName: lastName.value,
    email: regEmail.value,
    password: regPassword.value,
  });
  localStorage.setItem("personData", JSON.stringify(persons));

  firstName.value = "";
  lastName.value = "";
  regEmail.value = "";
  regPassword.value = "";
  confirmPassword.value = "";
  registerForm.classList.add("hide");
  registered.classList.remove("hide");
});
