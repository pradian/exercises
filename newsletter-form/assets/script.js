const email = document.getElementById("email");
const subscribeBtn = document.getElementById("subscribe");
const success = document.getElementById("success");

subscribeBtn.addEventListener("click", function () {
  console.log(email.value);
  if (email.value.includes("@") && email.value.includes(".")) {
    return success.classList.remove("hide");
  }
  return console.log("Invalid email address");
});
success.addEventListener("click", success.classList.add("hide"));
