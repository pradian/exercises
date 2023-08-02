const randBtn = document.getElementById("rand__color");
const parrentDiv = document.getElementById("parrent");
const removeLastBtn = document.getElementById("remove__last");

const arrOfColor = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];
function newColor() {
  let ranColor = "#";
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * arrOfColor.length);
    let value = arrOfColor[index];
    ranColor += value;
  }
  let div = document.createElement("div");
  div.style.background = ranColor;
  div.innerHTML = ranColor;
  return div;
}

randBtn.addEventListener("click", function () {
  const childDiv = newColor();
  parrentDiv.appendChild(childDiv);
});

removeLastBtn.addEventListener("click", function () {
  const children = parrentDiv.children;
  if (children.length > 0) {
    parrentDiv.removeChild(children[children.length - 1]);
  }
});
