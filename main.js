const playBoard = document.querySelector(".play_board");

let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let snakeBody = [];
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
};

const initGame = () => {
  let htmlMarkup = `<div class="food" style= "grid-area: ${foodY} / ${foodX} "></div>`;

  //checking if snake hits food
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]); //pushing foodpostion to snake body array
    console.log(snakeBody);
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    //shifting forward the values of the elem in the snake body by one
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY]; //settting first elem of snake body to current snake position

  //Updating snakes head based on current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  for (let i = 0; i < snakeBody.length; i++) {
    //adding a div for each part of the snakes body
    htmlMarkup += `<div class="head" style= "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
  }
  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
//--------------speed of the snake
setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
