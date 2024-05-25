const playBoard = document.querySelector(".play_board");

let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;

const changeFoodPosition = () => {
  // Passing a random 0 - 30 value as food position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) => {
  //Changing value on key press
  if (e.key === "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
  initGame();
};

const initGame = () => {
  let htmlMarkup = `<div class="food" style= "grid-area: ${foodY} / ${foodX} "></div>`;

  //Updating snakes head based on current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  htmlMarkup += `<div class="head" style= "grid-area: ${snakeY} / ${snakeX} "></div>`;
  playBoard.innerHTML = htmlMarkup;
};
changeFoodPosition();
initGame();
document.addEventListener("keydown", changeDirection);
