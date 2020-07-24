//test the file path to ensure app.js is loaded properly:
console.log('welcome to the game');

/*
sq1 | sq2 | sq3
sq4 | sq5 | sq6
sq7 | sq8 | sq9
*/

// var usingDt = document.querySelector('[data-tab="tab-1"]');

const elements = ['sq1', 'sq2', 'sq3', 'sq4', 'sq5', 'sq6', 'sq7', 'sq8', 'sq9'];

var gamePiece = 'X';
var winObject = {};

var player1 = null;
var player2 = null;

//initialize will call the event handlers to 'listen'
function initialize() {
  elements.forEach((target) => {
    document.querySelector(`[data-sq="${target}"]`).addEventListener('click', placePieceOnClick);
  })

  document.getElementById('resetBoard').addEventListener('click', clearBoardOnClick);
  document.getElementById('namePlayers').addEventListener('click', setWinnersTable);
};

//this function will add a piece ('X' or 'O') to target space when clicked
function placePieceOnClick(event) {
  //place current gamePiece in the square clicked & change gamePiece
  this.textContent = gamePiece;
  triggerPiece();
  //keep track of the square clicked for win condition
  winObject[this.dataset.sq] = this.innerText;
  //remove eventListener so piece cannot be changed
  this.removeEventListener('click', placePieceOnClick);
  //determine if a win has been achieved after every click
  isWinningCondition();
};

//manage 'state' via a global variable
function triggerPiece() {
  if (gamePiece === 'X') {
    gamePiece = 'O';
  } else {
    gamePiece = 'X';
  }
};

/*
WIN CONDITIONS ON BOARD:
horizontal:           vertical:             diagonal:
sq1 - sq2 - sq3       sq1 - sq4 - sq7       sq1 - sq5 - sq9
sq4 - sq5 - sq6       sq2 - sq4 - sq8       sq3 - sq5 - sq7
sq7 - sq8 - sq9       sq3 - sq6 - sq9
*/

//test for win conditions after every click
function isWinningCondition() {
  if (winObject.sq1) {
    if (winObject.sq1 === winObject.sq2 && winObject.sq2 === winObject.sq3) {
      triggerWinner('sq1');
    } else if (winObject.sq1 === winObject.sq4 && winObject.sq4 === winObject.sq7) {
      triggerWinner('sq1');
    }
  }
  if (winObject.sq7) {
    if (winObject.sq7 === winObject.sq8 && winObject.sq8 === winObject.sq9) {
      triggerWinner('sq7');
    }
  }
  if (winObject.sq3) {
    if (winObject.sq3 === winObject.sq6 && winObject.sq6 === winObject.sq9) {
      triggerWinner('sq3');
    }
  }
  if (winObject.sq5) {
    if (winObject.sq4 === winObject.sq5 && winObject.sq5 === winObject.sq6) {
      triggerWinner('sq5');
    } else if (winObject.sq3 === winObject.sq5 && winObject.sq5 === winObject.sq7) {
      triggerWinner('sq5');
    } else if (winObject.sq2 === winObject.sq5 && winObject.sq5 === winObject.sq8) {
      triggerWinner('sq5');
    } else if (winObject.sq1 === winObject.sq5 && winObject.sq5 === winObject.sq9) {
      triggerWinner('sq5');
    }
  }
};

function triggerWinner(target) {
  if (winObject[target] === 'X') {
    alert('Player ' + player1 + ' won the game!');
  } else {
    alert('Player ' + player2 + ' won the game!');
  }
  removeListeners();
  trackTheWinner(target);
};

//reset board, gamePiece, event listeners w/o refreshing page
function clearBoardOnClick(event) {
  console.log('the board was wiped clean!');
  elements.forEach((target) => {
    document.querySelector(`[data-sq="${target}"]`).textContent = ' ';
  });
  //reset / clear out the winObject for future gameplay:
  for (var keys in winObject) {
    delete winObject[keys];
  }
  //reset the event listeners
  elements.forEach((target) => {
    document.querySelector(`[data-sq="${target}"]`).addEventListener('click', placePieceOnClick);
  })
};

//remove remaining event listeners so board cannot be modified
function removeListeners() {
  elements.forEach((target) => {
    document.querySelector(`[data-sq="${target}"]`).removeEventListener('click', placePieceOnClick);
  });
};

//set the winners table with the players' names
function setWinnersTable() {
  player1 = prompt('Player 1: please enter your name!') || 'Player 1';
  player2 = prompt('Player 2: please enter your name!') || 'Player 2';

  document.getElementById('player1').innerText = player1 + ' (X)';
  document.getElementById('player2').innerText = player2 + ' (O)';
};

//track the winner on the table (only reset when page is refreshed)
function trackTheWinner(target) {
  if (document.querySelector(`[data-sq="${target}"]`).innerText === 'X') {
    document.getElementById('xWins').innerText ++;
    gamePiece = 'X';
  } else {
    document.getElementById('oWins').innerText ++;
    gamePiece = 'O';
  }
};

//activate the event listeners upon script load:
initialize();
