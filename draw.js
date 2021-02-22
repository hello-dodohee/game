const canvas = document.getElementById('pingpong');
const ctx = canvas.getContext('2d');

//rander 블랙 게임 보드에 그림그리기

function render(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.clientWidth, canvas.height);
}

render();

// some extra variables

const netWidth = 4;
const netHeight = canvas.height;

const paddleWidth = 10;
const paddleHeight = 100;

let upArrowPressed = false;
let downArrowPressed = false;

//object
//net
const net = {
    x : canvas.width / 2 - netWidth / 2,
    y : 0,
    width: netWidth,
    height: netHeight,
    color: "#fff"
};

//paddle
const user = {
    x : 10,
    y : canvas.height / 2 - paddleHeight / 2,
    width : paddleWidth,
    height: paddleHeight,
    color: "fff",
    score : 0
};

const com = {
    x : canvas.width - (paddleWidth + 10),
    y : canvas.height / 2 - paddleHeight / 2,
    width : paddleWidth,
    height: paddleHeight,
    color: "fff",
    score : 0
};

//ball
const ball = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    radius : 7,
    speed : 7,
    velocityX : 5,
    velocityY : 5,
    color: "#05EDFF"
};


//function to draw net
function drawNet(){
    ctx.fillStyle = net.color;
    ctx.fillRect(net.x, net.y, net.width, net.height);
}

//function to draw score
function drawScore(x, y, score){
    ctx.fillStyle = "#fff";
    ctx.font = '35px sans-serif';
    ctx.fillText(score, x, y);
}

function drawBall(x,y,radius,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

drawNet();
drawScore(canvas.width / 4, canvas.height / 6, user.score);
drawScore(3 * canvas.width / 4, canvas.height / 6, com.score);
drawPaddle(user.x, user.y, user.width, user.height, user.color);
drawPaddle(com.x, com.y, com.width, com.height, com.color);
drawBall(ball.x, ball.y, ball.radius, ball.color);