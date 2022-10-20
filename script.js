const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let life = 3;
let isGameOver = false;
let gameId = 0;
let nextLevel = false;

const brickHeight = 30;
const brickWidth = 100;
let movePaddleR = false;
let movePaddleL = false;

const paddleMarginBottom = 30;
const paddleWidth = 120;
const paddleHeight = 25;

const paddle = {
  x: canvas.width / 2 - paddleWidth / 2,
  y: canvas.height - paddleHeight - paddleMarginBottom,
  w: paddleWidth,
  h: paddleHeight,
  dx: 5,
};

const ballRadius = 15;
const ball = {
  x: canvas.width / 2,
  y: paddle.y - ballRadius,
  r: ballRadius,
  s: 2,
  dx: 3,
  dy: -3,
};

const end = function () {
  document.querySelector(".game").style.display = "none";
  document.querySelector(".end").style.display = "block";
};
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();
}

function ballWall() {
  if (ball.x > canvas.width || ball.x < 0) {
    ball.dx = -ball.dx;
  }
  if (ball.y < 0) {
    ball.dy = -ball.dy;
  }document.getElementById('lives').textContent=`Lives:${life}`;

  if (ball.y + ball.r > canvas.height) {
    life--;
    console.log(life);
    if (life === 0) {
      isGameOver = true;
    }
    resetBall();
  }
}

function resetBall() {
  // ball.x = canvas.width / 2;
  ball.x = paddle.x + (ballRadius*4);
  ball.y = paddle.y - ballRadius;
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
}

const bricks = {
  w: brickWidth,
  h: brickHeight,
  offSetLeft: 20,
  offSetTop: 20,
  marginTop: 40,
  x: 45,
  y: 15,
};
let score = 0;
let bricksArray = [];
let x = 10;
let y = 10;
for (let j = 0; j < 7; j++) {
  for (let i = 0; i < 10; i++) {
    bricksArray.push({ x, y });
    x += 110;
  }
  y += 40;
  x = 10;
}
function drawBricks() {
  bricksArray.forEach((brick, index) => {
    ctx.fillRect(brick.x, brick.y, 80, 20);
    if (
      brick.y + 20 > ball.y - ball.r&&
      brick.x < ball.x +ball.r&&
      brick.x + 80 > ball.x - ball.r&&
      brick.y < ball.y + ball.y
    ) {
      ball.dy = -ball.dy;
      bricksArray.splice(index, 1);
      score += 10;
      document.querySelector(".game-score").textContent=`Score:${score}`;
      document.querySelector(".end-score").textContent=`Your score is:${score}`
      console.log(score);
    }if (score === 700) {
      nextLevel = true
}
  });
}

function drawPaddle() {
  // ctx.beginPath();
  ctx.fillStyle = "grey";
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
  // ctx.closePath();
}

// const ball = {
//   drawBall: function () {
//     ctx.beginPath();
//     ctx.fillStyle = "#827AB7";
//     ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
//     ctx.fill();
//     ctx.closePath();
//   },
// };

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    movePaddleL = true;
  }
  if (event.code === "ArrowRight") {
    movePaddleR = true;
  }
});
document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowLeft") {
    movePaddleL = false;
  } else if (event.code === "ArrowRight") {
    movePaddleR = false;
  }
});
function movePaddle() {
  if (movePaddleL && paddle.x > 0) {
    paddle.x -= 4;
  }
  if (movePaddleR && paddle.x + paddle.w < canvas.width) {
    paddle.x += 4;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function ballPaddle() {
  if (
    ball.x < paddle.x + paddle.w &&
    ball.x > paddle.x &&
    ball.y < paddle.y + paddle.h &&
    ball.y > paddle.y
  ) {
    // let collidePoint = ball.x - (paddle.x - paddle.w / 2);
    // ball.dx = ball.dx*-1;
    ball.dy = ball.dy * -1;
    // ball.dx = -ball.dx;
    // ball.dy = ball.dx;
  }
}
function update() {
  movePaddle();
  moveBall();
  ballWall();
  ballPaddle();
}

function start() {
  document.querySelector(".start").style.display = "none";
  document.querySelector(".game").style.display = "block";
  ctx.clearRect(0, 0, 1000, 800);
  drawBricks();
  drawBall();
  drawPaddle();
  update();
  if (isGameOver) {
    cancelAnimationFrame(gameId);
    end()
  } else {
    gameId = requestAnimationFrame(start);
  }
}
startBtn.addEventListener("click", () => {
  start();
});

restartBtn.addEventListener("click", () => {
  document.querySelector(".game").style.display = "block";
  document.querySelector(".end").style.display = "none";
  isGameOver = false;
  score = 0;
 bricksArray = [];
y = 10;
x = 10;
life = 3;
  for (let j = 0; j < 7; j++) {
    for (let i = 0; i < 10; i++) {
      bricksArray.push({ x, y });
      x += 110;
    }
    y += 40;
    x = 10;
  }
  start();
});