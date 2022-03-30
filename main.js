//=======================================================
//build/fill the board.

//color for board.
const boardBorder = '#000';
const boardBackground = '#333';/*try this, look what happen'#0333'*/

//color for snake.
const snakeColor = 'lightblue';
const snakeBorder = 'darkblue';

//snake initial position.
let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
];

//get canvas element.
const snakeBoard = document.getElementById('gameBoard');

//return a two dimentional drawing contest.
const snakeBoard_ctx = gameBoard.getContext('2d');

//==========================
//Other Vars.

//score.
let score = 0;

//flag return true if chnging direction.
let changingDirection = false;

//Speed: movement in pixels.
//orizontal speed.
let speedX = 10;
//Vertical speed.
let speedY = 0; 

//Food variables.
let foodX;
let foodY;
//===========================================================
//start the game.
main();
//main function called repeatedley to keep the game running.

generateFood();

function main(){
    if(gameOver())return;
    changingDirection = false;
    //timer.
    if(score >= 100){
        setTimeout(function onMove(){
            clearCanvas();
            drawSnake();
            drawFood();
            moveSnake();
            gameOver();
            //We call the main again and again.(recursion).
            main();
        }, 10);
    }else if(score >= 50 && score < 100 ){
        setTimeout(function onMove(){
            clearCanvas();
            drawSnake();
            drawFood();
            moveSnake();
            gameOver();
            //We call the main again and again.(recursion).
            main();
        }, 20);
    }else if(score >= 40 && score < 50){
        setTimeout(function onMove(){
            clearCanvas();
            drawSnake();
            drawFood();
            moveSnake();
            gameOver();
            //We call the main again and again.(recursion).
            main();
        }, 30);
    }else if(score >= 30 && score < 40){
        setTimeout(function onMove(){
            clearCanvas();
            drawSnake();
            drawFood();
            moveSnake();
            gameOver();
            //We call the main again and again.(recursion).
            main();
        }, 40);
    }else if(score >= 20 && score < 30){
        setTimeout(function onMove(){
            clearCanvas();
            drawSnake();
            drawFood();
            moveSnake();
            gameOver();
            //We call the main again and again.(recursion).
            main();
        }, 60);
    }else if(score >= 10 && score < 20){
        setTimeout(function onMove(){
            clearCanvas();
            drawSnake();
            drawFood();
            moveSnake();
            gameOver();
            //We call the main again and again.(recursion).
            main();
        }, 80);
    }else if(score >= 0 && score < 10){
        setTimeout(function onMove(){
            clearCanvas();
            drawSnake();
            drawFood();
            moveSnake();
            gameOver();
            //We call the main again and again.(recursion).
            main();
        }, 100);
    }
}

//===========================================================
//All functions that will go into "main()";

//let's draw a border around the canvas.
function clearCanvas(){
    //Get color for border.
    snakeBoard_ctx.fillstroke = boardBorder;

    //Get color for canvas background.
    snakeBoard_ctx.fillStyle = boardBackground;

    //Draw rectangle or square of the same size of the canvas.
    //We use the method fillRect(x(strating point), y(starting point), width, height).
    //It uses coordinates to fill the square/rectangle.
    snakeBoard_ctx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);

    //Draw the border of the canvas.
    //We use the method strokeRect(x(strating point), y(starting point), width, height).
    //It uses coordinates to draw the border.
    snakeBoard_ctx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
}
//Function that prints the parts.
function drawSnake(){
    snake.forEach(drawSnakePiece);
}

//we are going to write a function which will draw a square for each part of the snake.
function drawSnakePiece(snakePiece){

    //color for each part of the snake.
    snakeBoard_ctx.fillStyle = snakeColor ;

    //color for snake border.
    snakeBoard_ctx.strokeStyle = snakeBorder;

    //fill each piece of the snake(play with parameters to see what is changing).
    snakeBoard_ctx.fillRect(snakePiece.x, snakePiece.y, 10, 10);

    //draw the border of each square(play with parameters to see what is changing).
    snakeBoard_ctx.strokeRect(snakePiece.x, snakePiece.y, 10, 10);

}

//-----------------------------
//Move automatically the snake.

//orizontal.
//Access each single element of the snake.
console.log(snake[0].x, snake[1].x, snake[2].y);

//We gonna move the element "head" of 10px by unshifting and popping each time "main function" will recursively call itself, following the timer of "setTimeOut function".
//This will be the speed:speedX--> orizontal velocity.
//                      :speedY--> vertical velocity.
// let speedX = 10;
// let speedY = 0; 
//Those vars are declared on top section with the other vars.

//Let's build a function which unshift the head and pop the last element.
function moveSnake(){
    //speedX = 10px, -speedX = -10px.(element.x + speedX)--> same for speedY(element.y + speedY).
    //Infact we have to update the "head" variable for the vertical movement "y + speedY".
    const head = {x: snake[0].x + speedX, y:snake[0].y + speedY};
    snake.unshift(head);
    const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;
    if(hasEatenFood){
        score += 1;
        document.getElementById('score').innerHTML = score;
        generateFood();
    }else{
        snake.pop();
    }
}

//--------------------------------------------
//Using the arrow keys to change the direction.
document.addEventListener('keydown', changeDirection);
function changeDirection(event){
    //Direction keyCode.
    const leftKey = 37;
    const rightKey = 39;
    const upKey = 38;
    const downKey = 40;

    if(changingDirection)return;
    changingDirection = true;

    const keyPressed = event.keyCode;

    //Actual movement.
    const goingUp = speedY === -10;
    const goingDown = speedY === 10;
    const goingRight = speedX === 10;
    const goingLeft = speedX === -10;

    if(keyPressed === leftKey && !goingRight){
       speedX = -10;
       speedY = 0;
    }else if(keyPressed === rightKey && !goingLeft){
       speedX = 10;
       speedY = 0;
    }else if(keyPressed === upKey && !goingDown){
       speedX = 0;
       speedY = -10;
    }else if(keyPressed === downKey && !goingUp){
       speedX = 0;
       speedY = 10;
    }
    //In this way the snake cannot turn on itself.
}
//---------------------------------------------
//On screen controllers (mobile controllers).
const Controllers = document.querySelectorAll('.btn');
for(i = 0; i < Controllers.length; i++){
    Controllers[i].addEventListener('click', controlMob);
    function controlMob(e){
        const goingUp = speedY === -10;
        const goingDown = speedY === 10;
        const goingRight = speedX === 10;
        const goingLeft = speedX === -10;
        if(e.target.classList.contains('btn-left') && !goingRight){
            speedX = -10;
            speedY = 0;
        }else if(e.target.classList.contains('btn-up') && !goingDown){
            speedX = 0;
            speedY = -10;
        }else if(e.target.classList.contains('btn-right') && !goingLeft){
            speedX = 10;
            speedY = 0;
        }else if(e.target.classList.contains('btn-down') && !goingUp){
            speedX = 0;
            speedY = 10;
        }
        e.preventDefault();
    }
}
//-----------------
//Game over function
function gameOver(){
    for(let i = 4; i < snake.length; i++){
        //create snake[i] strt from 4. Min length required for collision is 5.
        console.log(snake[i].x, snake[i].y)
        //if the head of the snake is equal to snake[i] return true.(it hits any part of its body with its head).
        const hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
        if(hasCollided){
            return true;
        }
    }

    //Let's create the canvas boudaries as max limitof action.(otherwise the snake will carry on forever outside the canvas frame).
    const crashLeft = snake[0].x < 0;
    const crashRight = snake[0].x > snakeBoard.width - 10;
    const crashTop = snake[0].y < 0;
    const crashBottom = snake[0].y > snakeBoard.height - 10;
    //console.log(crashRight)
    return crashLeft || crashRight || crashTop || crashBottom;
}

//----------------
//Random food on the canvas.
function randomFood(max, min){
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}
function generateFood(){
    foodX = randomFood(0, snakeBoard.width - 10);
    foodY = randomFood(0, snakeBoard.height - 10);
    snake.forEach(function hasSnakeEaten(part){
        const hasEaten = part.x == foodX && part.y == foodY;
        if(hasEaten) generateFood();
    });
}
function drawFood(){
    snakeBoard_ctx.fillStyle = 'lightgreen';
    snakeBoard_ctx.strokeStyle = 'darkgreen';
    snakeBoard_ctx.fillRect(foodX, foodY, 10, 10);
    snakeBoard_ctx.strokeRect(foodX, foodY, 10, 10);
}