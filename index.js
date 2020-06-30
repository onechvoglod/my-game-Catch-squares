"use strict";

function Quadrate() {
  this.x = Math.round(Math.random() * 580);
  this.y = 0;
  this.speed = Math.round(2 * Math.random() + 1);
  this.x2 = 20;
  this.y2 = 20;
  this.color =
    "rgb(" +
    255 * Math.random() +
    ", " +
    255 * Math.random() +
    ", " +
    255 * Math.random() +
    ")";

  this.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.x2, this.y2);
  };
}

const currentScore = document.querySelector("#currentScore");
currentScore.innerHTML = "0";
const arrayQuadrate = [];
let count = 0;
let timerId;

function startGame() {
  count = 0;
  timerId = setTimeout(function addQuadrate() {
    let k = new Quadrate();
    arrayQuadrate.push(k);
    timerId = setTimeout(addQuadrate, Math.random() * 2000);
  });
}

function resetGame() {
  clearTimeout(timerId);
  arrayQuadrate.length = 0;

  alert(`You score ${currentScore.innerHTML}`);
  currentScore.innerHTML = "";
}

const start = document.querySelector("#start");
const reset = document.querySelector("#reset");
reset.addEventListener("click", resetGame);
start.addEventListener("click", startGame);
const canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "green";

function animate() {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  arrayQuadrate.forEach((elem, i) => {
    elem.draw(ctx);
    elem.y += elem.speed;

    if (count > 20) {
      elem.y += elem.speed;
    }
    if (elem.y > 400) {
      arrayQuadrate.splice(i, 1);
      currentScore.innerHTML = Number(currentScore.innerHTML) - 1;
    }
    if (currentScore.innerHTML === "-5") {
      alert("You lose");
      resetGame();
    }
  });
  requestAnimationFrame(animate);
}

canvas.addEventListener("mousedown", function (event) {
  arrayQuadrate.forEach((elem, i) => {
    if (
      elem.x + elem.x2 >= event.clientX - 8 &&
      elem.x <= event.clientX - 8 &&
      elem.y + elem.y2 >= event.clientY - 30 &&
      elem.y <= event.clientY - 30
    ) {
      arrayQuadrate.splice(i, 1);
      count++;
      currentScore.innerHTML = Number(currentScore.innerHTML) + 1;
    }
  });
});

document.body.onload = animate;
