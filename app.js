

// all possible combinations of squares to win 
var winningCombos = [
    [0, 1, 2],
    [2, 5, 8],
    [0, 3, 6],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [1, 4, 7],
    [2, 4, 5]
]


// player objects
// TODO when making moves, append move to player objects
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
            console.log(`${player.side} has won`)
            //set player to winner
            player.isWinner = true;
            return;
        }
    }  
}


var element = document.querySelectorAll('li');
var gameCounter = 0;


function handleClick(event){
    checkWin(playerTwo)
    checkWin(playerOne)
    chooseSquare(event);
    if(playerOne.isWinner){
        alert(playerOne.side + " is the winner")
    }else if(playerTwo.isWinner){
        alert(playerTwo.side + " is the winner")
    }
}

function chooseSquare(e){
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

function playerChoices(playerIs, e){
    playerIs.moves.push(Number(e.target.getAttribute("data-square")))
    e.target.removeAttribute("data-square")
    console.log(playerIs.moves)

}



for(let i = 0; i < element.length; i++)(
    element[i].addEventListener('click', handleClick)
)