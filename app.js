// select Html elements
var element = document.querySelectorAll('li');
var restart = document.querySelector('.start-again');
var playerOneScore = document.querySelector('.score-traker-O span');
var playerTwoScore = document.querySelector('.score-traker-X span');
var title = document.querySelector('.title');


//global variable to keep track of moves made
var gameCounter = 0;

//global variable to check if the game will continue
var gameOver = false;

// all possible combinations of squares to win 
var winningCombos = [
    [0, 1, 2],
    [2, 5, 8],
    [0, 3, 6],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [1, 4, 7],
    [2, 4, 6],
    [3, 4, 5]
]

// player objects
var playerOne = {
    side: "O",
    moves: [],
    isWinner: false
}
var playerTwo = {
    side: "X",
    moves: [],
    isWinner: false
}

//happens after each click event
function handleClick(event){
    // debugger
    draw()
    chooseSquare(event);
    gameOverCheck();

}
// restart button
restart.addEventListener('click', NewGame);

// writes the players move into the clicked box
function chooseSquare(e){
    if(!gameOver){
        if(e.target.textContent == ""){
            if(gameCounter % 2 == 0 && e.target.textContent !== "O"){
                playerChoices(playerTwo, e)
                e.target.textContent = "X"
                gameCounter = gameCounter + 1
            }else if(e.target.textContent !== "X"){
                playerChoices(playerOne, e)
                e.target.textContent = "O"
                gameCounter = gameCounter + 1
            }
        }
        
    }

}

function draw(){
    console.log(playerOne.moves.length)
    if(playerOne.moves.length == 5 && !gameOver){
        gameOver = true;
        alert("no one wins")
        title.textContent = "Draw" 
    }
}

//keeps track of each players moves
function playerChoices(playerIs, e){
    if(!gameOver){
        playerIs.moves.push(Number(e.target.getAttribute("data-square")))
        e.target.removeAttribute("data-square")        
        // console.log(playerOne.moves)
    }
}


//checks is either player is winner then sets game over to true
function gameOverCheck(){
    if(gameCounter >= 3){
        checkWin(playerTwo)
        checkWin(playerOne)
        if(playerOne.isWinner){
            title.textContent = playerOne.side + " Wins" 
            gameOver = true;
            return true;
        }else if(playerTwo.isWinner){
            title.textContent = playerTwo.side + " Wins" 
            gameOver = true;
            return true;
        }
    }
}


//made another function to make more readable
//unpacks each index of the comboWins and checks if it matches the players moves, if it does, set's the playes isWinner boolean to true
function comboCheck(player, comboIndex){
    var winMoves = 0;

    for(let i = 0; i < player.length; i++){
        for(let a = 0; a < winningCombos[comboIndex].length; a++){
            if(player[i] == winningCombos[comboIndex][a]){
                winMoves ++;
            }
        }
    }
    // if the player has one of the combos return true
    if(winMoves >= 3){
        return true;
    }
}
function checkWin(player){
    for(let j = 0; j < winningCombos.length; j++){
        if(comboCheck(player.moves, j)){
            // console.log(`${player.side} has won`)
            //set player to winner
            player.isWinner = true;
            // return;
        }
    }  
}

function scoreTraker(){
    if(playerOne.isWinner){
        playerOneScore.textContent = Number(playerOneScore.textContent) + 1;
    }else if(playerTwo.isWinner){
        playerTwoScore.textContent = Number(playerTwoScore.textContent) + 1
    }
}

function NewGame(){
    scoreTraker()
    title.textContent = "Tic-Tac-Toe" 
    gameOver = false;
    playerOne.isWinner = false;
    playerTwo.isWinner = false;
    playerOne.moves.length = 0;
    playerTwo.moves.length = 0;
    // console.log(element[0].textContent = "");
    for(let i = 0; i < 9; i++){
        element[i].textContent = ""
        element[i].setAttribute("data-square", i)
    }
}




for(let i = 0; i < element.length; i++){
    element[i].addEventListener('click', handleClick)
}