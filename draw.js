// 캔버스 그리기 - 게임보드 그리기
const canvas = document.getElementById('pingpong');
const ctx = canvas.getContext('2d');

// 추가적인 변수

//네트
const netWidth = 4;
const netHeight = canvas.height;

//페들
const paddleWidth = 10;
const paddleHeight = 100;

let upArrowPressed = false;
let downArrowPressed = false;

//객체 만들기 x 위치 , y 위치 , 폭 , 높이 , 컬러

//네트 x 위치, 
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

//ball x 위치, y 위치 반경, 속도, velocityX, velocityY , 컬러
const ball = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    radius : 7,
    speed : 7,
    velocityX : 5,
    velocityY : 5,
    color: "#05EDFF"
};

// 개체 생성 끝

//객체 기능 - 네트 생성
function drawNet(){
    ctx.fillStyle = net.color;
    ctx.fillRect(net.x, net.y, net.width, net.height);
}


//객체 기능 - 스코어 생성
function drawScore(x, y, score){
    ctx.fillStyle = "#fff";
    ctx.font = '35px sans-serif';
    ctx.fillText(score, x, y);
}
//객체 기능 - 페들 생성
function drawPaddle (x,y,width,height,color){
    ctx.fillStlye = color;
    ctx.fillRect(x,y,width,height);
}

//객체 기능 - 공 생성
function drawBall(x,y,radius,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}


//rander 게임 보드에 그림그리기

function render(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.clientWidth, canvas.height);
    drawNet();
    drawScore(canvas.width / 4, canvas.height / 6, user.score);
    drawScore(3 * canvas.width / 4, canvas.height / 6, com.score);
    drawPaddle(user.x, user.y, user.width, user.height, user.color);
    drawPaddle(com.x, com.y, com.width, com.height, com.color);
    drawBall(ball.x, ball.y, ball.radius, ball.color);
}


// 게임루프 생성 전체 흐름제어

function gameLoop(){


    render(); //게임 보드 나타내기
}

setInterval(gameLoop, 1000 / 60);