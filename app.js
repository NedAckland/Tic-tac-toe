// select Html elements
var element = document.querySelectorAll('li');

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
    [2, 4, 6]
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
    chooseSquare(event);
    gameOverCheck();

}

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

//keeps track of each players moves
function playerChoices(playerIs, e){
    if(!gameOver){
        playerIs.moves.push(Number(e.target.getAttribute("data-square")))
        e.target.removeAttribute("data-square")        
        console.log(playerIs.moves)
    }
}


//checks is either player is winner then sets game over to true
function gameOverCheck(){
    if(gameCounter >= 3){
        checkWin(playerTwo)
        checkWin(playerOne)
        if(playerOne.isWinner){
            alert(playerOne.side + " is the winner")
            gameOver = true;
            return true;
        }else if(playerTwo.isWinner){
            alert(playerTwo.side + " is the winner")
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


for(let i = 0; i < element.length; i++)(
    element[i].addEventListener('click', handleClick)
)