const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

const [dots, folds] = input.split('\n\n');
const dotsArray = dots.split('\n').map(coord => coord.split(',').map(string => +string));
const foldsArray = folds.split('\n').map(row => row.split(' ')[2].split('='));

const xMax = Math.max(...dotsArray.map(coord => coord[0]));
// I need one more row for the folding to work
const yMax = Math.max(...dotsArray.map(coord => coord[1])) + 1;
console.log(xMax, yMax);

const dotsMatrix = [];
for (let i = 0; i <= yMax; i++) {
  dotsMatrix.push(new Array(xMax + 1).fill(null));
}

dotsArray.forEach(([x, y]) => {
  dotsMatrix[y][x] = '#';
});

function fold(matrix, instruction) {
  function foldX() {
    const xLength = matrix[0].length;
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < instruction[1]; x++) {
        matrix[y][x] = matrix[y][x] || matrix[y][xLength - 1 - x];
      }
    }
    for (const row of matrix) {
      row.length = instruction[1];
    }
  }
  function foldY() {
    for (let y = 0; y < instruction[1]; y++) {
      for (let x = 0; x < matrix[0].length; x++) {
        matrix[y][x] = matrix[y][x] || matrix[matrix.length - 1 - y][x];
      }
    }
    matrix.length = instruction[1]
  }
  if (instruction[0] === 'x') {
    foldX();
  } else {
    foldY();
  }
  return matrix;
}

// Part 1
fold(dotsMatrix, foldsArray[0]);
const result_1 = dotsMatrix.reduce((accu, row) => accu + row.filter(item => item === '#').length, 0);
console.log('Result part 1:', result_1);

// Part 2
for (let i = 1; i < foldsArray.length; i++) {
  fold(dotsMatrix, foldsArray[i]);
}
const dotsPointsMatrix = dotsMatrix.map(row => row.map(item => item || '.'));
const bigString = dotsPointsMatrix.map(array => array.join(' ')).join('\n');
console.log(bigString);