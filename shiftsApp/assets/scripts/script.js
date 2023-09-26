const homepage = document.getElementById("homepage");
const registrationForm = document.getElementById("registrationForm");
const loginUsername = document.getElementById("loginUsername");
const loginPwd = document.getElementById("loginPwd");
const loginBtn = document.getElementById("loginBtn");
const loggedIn = JSON.parse(localStorage.getItem("loggedIn")) || [];
const users = JSON.parse(localStorage.getItem("users")) || [];

function setLocalStorage() {
  localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
}
console.log(users);
console.log(loggedIn);
if (loggedIn.length > 0) {
  window.location.replace("home.html");
}
registrationForm.addEventListener("click", () => {
  window.location.href = "register.html";
});

loginBtn.addEventListener("click", () => {
  const user = users.find(
    (user) =>
      user.username === loginUsername.value && user.password === loginPwd.value
  );
  if (user) {
    loggedIn.push(user.username);
    setLocalStorage();
    window.location.replace("home.html");
  } else {
    alert("Username or password is incorrect");
  }
});
