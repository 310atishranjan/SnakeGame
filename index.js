let direction={x:0,y:0};
//sound add
let foodsound=new Audio('');
let gameoversound=new Audio('');
let movesound=new Audio('');
let musicsound=new Audio('');

//gameloop
let speed=3;
let lastPaintTime=0;

function main(ctime)
{
    //every time it repeat
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
    return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
let snakeArr=[{x:13,y:15}]
let food ={x:6,y:7}
let score=0;
inputDir={x:0,y:1};  
function isCollide(snake){
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
        return true;
    }
    if(snake[0].x>=20||snake[0].x<=0 || snake[0].y>=20||snake[0].y<=0)
    {
            return true;
    }
    return false;
}
function gameEngine(){
    //part1: updating the snake array
    if(isCollide(snakeArr)){
        inputDir={x: 0,y: 0};
        alert("Game Over. Press any key to play again");
        snakeArr=[{x: 13,y: 15}];
        score=0;
    }
    //if eaten the food,increment the food and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
    {
        score=score+1;
        scoreBox.innerHTML="score: "+score;
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x,y: snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}//food position after eaten
    }
    //moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
     
    //part2: display the snake and food
    //part-2
    //display the snake
        board.innerHTML="";
        snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        //insert in board
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
        
    });

    //display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
        //insert in board
    foodElement.classList.add('food');
    board.appendChild(foodElement);
        
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    //start the game
    
   inputDir={x: 0,y: 0};
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        
            default:
            break;
    }
});