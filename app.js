// select Html elements
var element = document.querySelectorAll('li');
var restart = document.querySelector('.start-again');
var playerOneScore = document.querySelectorAll('.score-traker-O span')[1];
var playerTwoScore = document.querySelectorAll('.score-traker-X span')[1];
var playerOneName = document.querySelector('.score-traker-O span');
var playerTwoName = document.querySelector('.score-traker-X span');
var title = document.querySelector('.title');
var options = document.querySelector('.options');
var optionWrap = document.querySelector('.option-wrap');
var playerOptions = document.querySelector('.player-one-options');
var p1NameChange = document.querySelector('.p1-name-change');
var p2NameChange = document.querySelector('.p2-name-change');

var nameInput = document.querySelectorAll('input');
var btn = document.querySelectorAll('button');
var span = document.querySelectorAll('span');

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
// var computerPlayer = {
//     moves: [],
//     isWinner: false
// }

//happens after each click event
function handleClick(event){
    // debugger
    // console.log(gameCounter)
    draw()
    chooseSquare(event);
    gameOverCheck();

}
// restart button
restart.addEventListener('click', NewGame);

//option menu name
options.addEventListener('click', optionDropDown);

// writes the players move into the clicked box
function chooseSquare(e){
    if(!gameOver){
        if(e.target.textContent == ""){
            if(!isVsComputer){
                if(gameCounter % 2 == 0 && e.target.textContent !== "O"){
                    playerChoices(playerTwo, e)
                    e.target.textContent = "X"
                    gameCounter = gameCounter + 1
                }else if(e.target.textContent !== "X"){
                    playerChoices(playerOne, e)
                    e.target.textContent = "O"
                    gameCounter = gameCounter + 1
                }
            }else{
            chooseSquareCompuer(e)
            // console.log("choosesquareCompuer")
            }
        }
        
    }

}

function chooseSquareCompuer(e){

    var num = numberGen()
    if (element[num].textContent === undefined){
        var num = numberGen()
    }
    checkIfMovePlayed(num)
    if(gameCounter % 2 == 0 && e.target.textContent !== "X"){
        playerChoices(playerOne, e)
        e.target.textContent = "O"
        gameCounter = gameCounter + 1
    }else if(element[num].textContent !== "O"){
        computerChoice(num);
        element[num].textContent = "X"
        gameCounter = gameCounter + 1
    }
}

function draw(){
    if((playerOne.moves.length + playerTwo.moves.length) == 9){
        gameOver = true;
        title.textContent = "Draw" 
    }
}

//keeps track of each players moves
function playerChoices(playerIs, e){
    if(!gameOver){
        playerIs.moves.push(Number(e.target.getAttribute("data-square")))
        e.target.removeAttribute("data-square")        
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
            //set player to winner
            player.isWinner = true;
        }
    }  
}
// Tracks current users scores
function scoreTraker(){
    if(vsComputer){
        playerTwoScore.textContent = 0;
    }
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


/////////////////////////////////////////////////////////////////////////////// name changing ///////////////////////////////////////////////////////////////////////////
//to prevent needing to double click
optionWrap.style.visibility = "hidden";


//change the player name
function optionDropDown(){
    if(optionWrap.style.visibility == "hidden"){
        optionWrap.style.visibility = "visible"
        optionWrap.style.transform = "scale(1)"

    }else{
        optionWrap.style.visibility = "hidden"
        optionWrap.style.transform = "scale(0)"
    }

}

function changeNameOne(){
    playerOne.side  = nameInput[0].value;
    playerOneName.textContent = nameInput[0].value + ' - ';
}
function changeNameTwo(){
    playerTwo.side  = nameInput[1].value;
    playerTwoName.textContent = nameInput[1].value + ' - ';
}


function spanTest(event){
    if(event.target.getAttribute("data-player") == '0'){
        toggleInput(p1NameChange);
        confirmChange()
    }else if(event.target.getAttribute("data-player") == '1'){
        confirmChange()
        toggleInput(p2NameChange);
    }
    
}

function confirmChange(){
    changeNameOne()
    changeNameTwo()
}

p1NameChange.style.visibility = "hidden";
p2NameChange.style.visibility = "hidden";

function toggleInput(player){
    if(player.style.visibility == "visible"){
        player.style.visibility = "hidden";
    }else{
        player.style.visibility = "visible";
    }
}
////////////////////////////////////////////////////play vs computer////////////////////////////////////////////////////////////////////////////
// add option in menu 
// asign player 2 as computer
var computerSelector = document.querySelector('.play-computer');

var isVsComputer = false;
var gameMode = document.querySelector('.play-computer span');
gameMode.textContent = "play computer"

function vsComputer(){
    NewGame();
    if(gameMode.textContent == "play computer"){
        gameMode.textContent = "play human"
        isVsComputer = true;
        playerTwoName.textContent = "Computer  - "
    }else{
        gameMode.textContent = "play computer"
        isVsComputer = false;
        playerTwoName.textContent = "X - "
    }
    // console.log(numberGen())
}

console.log(numberGen());
// choose out of possible numbers
function numberGen(){
    var squaresLeft = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // var movesMade = Number(playerOne.moves.concat(playerTwo.moves));
    var movesMade = [0, 1, 2];
    var availableSquares = [];
    // for(let i = 0; i < movesMade.length; i++){
    //     for(let a = 0; a < squaresLeft.length; a++){
    //         // if(!(movesMade[i] == squaresLeft[a])){
    //             availableSquares = []

    //         }
    //     }
    // }

    // 
    console.log("moves made " + movesMade)
    console.log("sqaures left " + squaresLeft)


    for(let i = 0; i < squaresLeft.length; i ++){
        var pcChoice = Math.floor(Math.random() * squaresLeft[i]); 

    }
    // console.log(pcChoice)
    return pcChoice;
}

function checkIfMovePlayed(pcChoice){
    if((pcMove[pcChoice].getAttribute("data-square") === undefined)){
        console.log("undefined")
    }

}

var pcMove = document.querySelectorAll('li');

function computerChoice(moveIs){
    if(!gameOver){
        playerTwo.moves.push(Number(pcMove[moveIs].getAttribute("data-square")))
        pcMove[moveIs].removeAttribute("data-square")        
    }
    // console.log(moveIs)

}

computerSelector.addEventListener('click', vsComputer);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

for(let i = 0; i < element.length; i++){
    element[i].addEventListener('click', handleClick)
}

for(let i = 0; i < span.length; i++){
    span[i].addEventListener('click', spanTest)
}

for(let i = 0; i < btn.length; i++){
    btn[i].addEventListener('click', confirmChange)
}

