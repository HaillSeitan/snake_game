const playBoard = document.querySelector(".play_board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high_score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let snakeBody = [];
let velocityX = 0,
  velocityY = 0;
let setIntervalId;
let score = 0;

//getting high score from local storage
let highScore = localStorage.getItem("high_score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
  // Passing a random 0 - 30 value as food position
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
  //clearing timer, reloading page on game over
  clearInterval(setIntervalId);
  alert("GAME OVER! Press OK to replay...");
  location.reload();
};

const changeDirection = (e) => {
  //Changing value on key press
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

controls.forEach((key) => {
  // calling changeDirection on each key click and passing key dataset value as an object
  key.addEventListener("click", () =>
    changeDirection({ key: key.dataset.key })
  );
});

const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style= "grid-area: ${foodY} / ${foodX} "></div>`;

  //checking if snake hits food
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]); //pushing foodpostion to snake body array
    score++;

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high_score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    //shifting forward the values of the elem in the snake body by one
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY]; //settting first elem of snake body to current snake position

  //Updating snakes head based on current velocity
  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    //adding a div for each part of the snakes body
    htmlMarkup += `<div class="head" style= "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
    //snake head hits body
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    )
      gameOver = true;
  }

  playBoard.innerHTML = htmlMarkup;
};

changeFoodPosition();
//--------------speed of the snake
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);

//
