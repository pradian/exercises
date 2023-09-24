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
