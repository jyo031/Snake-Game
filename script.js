
//game constant & var
let snakeVelocity = {x : 0, y : 0};
// const let foodSound = new Audio('');
//  const let gameOverSound = new  Audio('');
//  const let moveSound = new Audio('');
//  const let musicFood = new Audio('');
let speed = 9;
let score = 0;
let  highscoreVal = 0;
let lastPaintTime = 0; 
let snakeArr = [
    {x : 13, y : 15}
]
food = {x : 9, y : 7};


//game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime) / 1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollapse(snake) {
    //bump itself
    for (let i = 1; i < snakeArr.length; i++) {
     if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
     }
    }
    //bump into the wall
     if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
     } 
    
}


function gameEngine() {
    // updating the snake array & food
    if(isCollapse(snakeArr)){
        // gameOverSound.play();
        // musicSound.pause();
        snakeVelocity = {x : 0, y : 0}
        alert('Game Over.. Press any Key to Play again....');
        snakeArr = [
            {x : 13, y : 15}
        ]
        // musicSound,play();
        score = 0;
    }


    //regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        // foodSound.play();
        score = score + 1;
        if(score > highscoreVal) {
            highscoreVal = score;
            localStorage.setItem('Highscore', JSON.stringify(highscoreVal));
            document.querySelector('.highscorebox').innerHTML = 'High Score : '+highscoreVal;
        }
        document.querySelector('.scorebox').innerText = 'Score :' + score;
        snakeArr.unshift({x : snakeArr[0].x + snakeVelocity.x, y : snakeArr[0].y + snakeVelocity.y }) //unshift adds element at the starting
        let a = 2;
        let b = 16;
        food = {x : Math.round(a + (b - a) * Math.random()), y : Math.round(a + (b - a) * Math.random())  } // random num b/w a & b
    }


    //moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--){
     snakeArr[i+1] = {...snakeArr[i]}

    }

    snakeArr[0].x += snakeVelocity.x;
    snakeArr[0].y += snakeVelocity.y;



    // display the snake 
    board.innerHTML = '';
    snakeArr.forEach((e,index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

      // display the food
      foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}








//main logic
let highScore = localStorage.getItem('Highscore');
if(highScore === null){
    highscoreVal = 0;
    localStorage.setItem('Highscore', JSON.stringify(highscoreVal))
}
else{
    highscoreVal = JSON.parse(highScore);
    document.querySelector('.highscorebox').innerHTML = 'High Score : '+highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e => {
    snakeVelocity = {x : 0, y : 1} //start the game
    // moveSound.play();
    switch(e.key) {
            case 'ArrowUp':
                console.log('ArrowUp');
                snakeVelocity.x = 0;
                snakeVelocity.y = -1;
                break;
            case 'ArrowDown':
                console.log('ArrowDown');
                snakeVelocity.x = 0;
                snakeVelocity.y = 1;
                break;
            case 'ArrowLeft':
                console.log('ArrowLeft');
                snakeVelocity.x = -1;
                snakeVelocity.y = 0;
                break;
            case 'ArrowRight':
                console.log('ArrowRight');
                snakeVelocity.x = 1;
                snakeVelocity.y = 0;
                break;
            default:
                break;
    }
});