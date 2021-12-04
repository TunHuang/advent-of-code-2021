const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

const inputArray = input.split('\n\n');
const draws = inputArray.shift()
                        .split(',')
                        .map(item => +item);

const boards = inputArray.map(board => board.split('\n')
                                            .map(row => row.trimStart().split(/\s+/)));

function isWinningBoard(board) {
  const rows = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0
  };
  for (let i = 0; i < 5; i++) {
    let rowCounter = 0;
    for (let j = 0; j < 5; j++) {
      if (board[i][j][0] === 'x') {
        rowCounter++;
        rows[j]++;
      }
    }
    if (rowCounter === 5) {
      return true;
    }
  }
  return Object.values(rows).includes(5);
}

function markNumber(board, number) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j] == number) {
        board[i][j] = 'x' + board[i][j];
        return;
      }
    }
  }
}

function getFirstWinningBoard(boards, draws) {
  const boardsCopy = JSON.parse(JSON.stringify(boards));
  for (let i = 0; i < 4; i++) {
    boardsCopy.forEach((board) => markNumber(board, draws[i]));
  }
  for (let i = 4; i < draws.length; i++) {
    for (let j = 0; j < boardsCopy.length; j++) {
      markNumber(boardsCopy[j], draws[i]);
      if (isWinningBoard(boardsCopy[j])) {
        return {
          board: boardsCopy[j],
          lastDrawnNumber: draws[i]
        };
      }
    }
  }
}

function calcScore(bingoResult) {
  const board = bingoResult.board;
  const sum = board.reduce((outerSum, row) => outerSum + row.reduce((innerSum, item) => {
    if (item[0] !== 'x') {
      return innerSum + +item;
    }
    return innerSum;
  }, 0), 0);
  return sum * bingoResult.lastDrawnNumber;
}

const result_1 = getFirstWinningBoard(boards, draws);
console.log('first winning board:', result_1);
const score_1 = calcScore(result_1);
console.log('score:', score_1);

// Part 2

function getLastWinnigBoard(boards, draws) {
  const boardsCopy = JSON.parse(JSON.stringify(boards));
  for (let i = 0; i < 4; i++) {
    boardsCopy.forEach((board) => markNumber(board, draws[i]));
  }
  for (let i = 4; i < draws.length; i++) {
    for (let j = 0; j < boardsCopy.length;) {
      markNumber(boardsCopy[j], draws[i]);
      if (isWinningBoard(boardsCopy[j])) {
        if (boardsCopy.length === 1) {
          return {
            board: boardsCopy[0],
            lastDrawnNumber: draws[i]
          };
        }
        boardsCopy.splice(j, 1);
      } else {
        j++;
      }
    }
  }
}

const result_2 = getLastWinnigBoard(boards, draws);
console.log('last winning board:', result_2);
const score_2 = calcScore(result_2);
console.log('score', score_2);