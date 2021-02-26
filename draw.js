// 캔버스 그리기 - 게임보드 그리기
const canvas = document.getElementById('pingpong');
const ctx = canvas.getContext('2d');

// 사운드 추가하기
const hitSound = new Audio('../sound/hitSound.wav');  // 공이 패들을 치면 소리나게
const scoreSound = new Audio('../sound/scoreSound.wav'); // 누군가 점수를 얻으면 소리나게
const wallHitSound = new Audio('../sound/wallHitSound.wav');  // 공이 상단이나 하단 벽에 닿으면 소리나게

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
//네트
const net = {
    x : canvas.width / 2 - netWidth / 2,
    y : 0,
    width: netWidth,
    height: netHeight,
    color: "#fff"
};

//패들 - 사용자
const user = {
    x : 10,
    y : canvas.height / 2 - paddleHeight / 2,
    width : paddleWidth,
    height: paddleHeight,
    color: "fff",
    score : 0
};

// 패들 - 사용자
const com = {
    x : canvas.width - (paddleWidth + 10),
    y : canvas.height / 2 - paddleHeight / 2,
    width : paddleWidth,
    height: paddleHeight,
    color: "fff",
    score : 0
};

//공 x 위치, y 위치 반경, 속도, velocityX, velocityY , 컬러
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

// 사용자 패들 움직임
// 컴퓨터 상에서 키 움직임 사용할 것
window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

//아래방향 키를 눌렀을때
function keyDownHandler(event) {
    // get the keyCode
    switch (event.keyCode) {
        // "up arrow" key
        case 38:
        // set upArrowPressed = true
        upArrowPressed = true;
        break;
        // "down arrow" key
        case 40:
        downArrowPressed = true;
        break;
    }
}

//위에방향 키를 눌렀을때
function keyUpHandler(event) {
    switch (event.keyCode) {
        // "up arraow" key
        case 38:
        upArrowPressed = false;
        break;
        // "down arrow" key
        case 40:
        downArrowPressed = false;
        break;
    }
}

// 공 자리 리셋시키기
function reset() {
    //공을 이전 값으로 되돌린다.
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;
  
    // 턴마다 공자리를 바꾼다.
    ball.velocityX = -ball.velocityX;
    ball.velocityY = -ball.velocityY;
}
// 공과 패들 충돌감지
// 공이 패들에 닿으면 true / 그렇지 않으면 false 반환
function collisionDetect(player, ball) {
    // returns true or false
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

function update() {
    // 패들 이동하기 
    if (upArrowPressed && user.y > 0) {
        user.y -= 8;
    } else if (downArrowPressed && (user.y < canvas.height - user.height)) {
        user.y += 8;
    }

    // 공 충돌감지
    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
    // play 벽에 부딪히는 소리
    wallHitSound.play();
    ball.velocityY = -ball.velocityY;
    }

    // 만약 공이 오른쪽 벽에 부딪힐때
    if (ball.x + ball.radius >= canvas.width) {
    // play scoreSound
    scoreSound.play();
    // 사용자 스코어가 1점 오른다.
    user.score += 1;
    reset();
    }

    // 만약 공이  왼쪽 벽에 부딪힐때
    if (ball.x - ball.radius <= 0) {
    // play scoreSound
    scoreSound.play();
    // 컴퓨터 스코어가 1점 오른다.
    com.score += 1;
    reset();
    }
    // 공 움직임 기본셋팅 - 공을 아래쪽으로 움직이게 설정
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // 컴퓨터 패들 움직임
    com.y += ((ball.y - (com.y + com.height / 2))) * 0.09;
    //

let player = (ball.x < canvas.width / 2) ? user : com;

  if (collisionDetect(player, ball)) {
    // 부딪히는 소리
    hitSound.play();
    // 각도는 0으로 기본셋팅
    let angle = 0;

    // 공이 패들 상단을 치면 -45도 각도로 반사된다.
    if (ball.y < (player.y + player.height / 2)) {
      angle = -1 * Math.PI / 4;
    } else if (ball.y > (player.y + player.height / 2)) {
      // 공이 패들 하단을 치면 45도 각도로 반사된다.
      angle = Math.PI / 4;
    }

    // 공이 사용자 패들에 부딪히면 오른쪽으로 밀고,
    // 공이 컴퓨터 패들에 부딪히면 왼쪽으로 민다.
    ball.velocityX = (player === user ? 1 : -1) * ball.speed * Math.cos(angle);
    ball.velocityY = ball.speed * Math.sin(angle);

    // 공 속도 증가
    ball.speed += 0.2;
  }
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
    update(); // 게임 업데이트
    render(); //게임 보드 나타내기
}

setInterval(gameLoop, 1000 / 60);