const canvas = document.getElementById('pingpong');
const ctx = canvas.getContext('2d');

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
//function to draw paddle
function drawPaddle (x,y,width,height,color){
    ctx.fillStlye = color;
    ctx.fillRect(x,y,width,height);
}

//function to draw ball
function drawBall(x,y,radius,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}
//moving paddles

window.addEventListener("keydown" , keyDownHandler);
window.addEventListener("keyup",keyUpHandler);

function keyDownHandler(event){
    switch(event.keyCode){
        case 38:
            upArrowPressed = true;
            break;
        case 40:
            downArrowPressed = true;
            break;
    }
}

function keyUpHandler(event){
    switch (event.keyCode){
        case 38:
            upArrowPressed = false;
            break;
        case 40:
            downArrowPressed = false;
            break;
    }
}

//공 자리 재설정
function reset(){
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;

    ball.velocityX = -ball.velocityX;
    ball.velocityY = -ball.velocityY;
}

//공이 패들 하나에 닿으면 true 그렇지 않으면 faluse
function collisitionDetect(player, ball){
    player.top = player.y;
    player.right = player.x + player.width;
    player.bottom = player.y + player.height;
    player.left = player.x;

    ball.top = ball.y - ball.radius;
    ball.right = ball.x + ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;

    return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}
//update 함수 위치잡기
function update(){
    
    //페들 움직이기
    if (upArrowPressed && user.y > 0){
        user.y -= 8;
    } else if (downArrowPressed && (user.y < canvas.height - user.height)){
        user.y += 8;
    }

    // 충돌감지
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius <= 0){
        ball.velocityY = -ball.velocityY;
    }

    if(ball.x + ball.radius > canvas.width){
        user.score += 1;
        reset();
    }
    
    if(ball.x - ball.radius < 0){
        com.score += 1;
        reset();
    }
    // 볼 움직이기
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    //com 패들 이동
    com.y += ((ball.y - (com.y + com.height / 2))) * 0.09;
}

//rander 블랙 게임 보드에 그림그리기

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

render();