const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

const inputArray = input.split('\n').map(row => row.split('').map(char => +char));

function isLowpoint(array, x, y) {
  const adjacentPoints = [];
  if (array[y-1] !== undefined) {
    adjacentPoints.push(array[y-1][x]);
  }
  if (array[y][x-1] !== undefined) {
    adjacentPoints.push(array[y][x-1]);
  }
  if (array[y][x+1] !== undefined) {
    adjacentPoints.push(array[y][x+1]);
  }
  if (array[y+1] !== undefined) {
    adjacentPoints.push(array[y+1][x]);
  }
  for (const point of adjacentPoints) {
    if (array[y][x] >= point) {
      return false;
    }
  }
  return true;
}

/* const smallSample = `2199943210
3987894921
9856789892
8767896789
9899965678`

const smallArray = smallSample.split('\n').map(row => row.split('').map(char => +char));

console.log(smallArray);

const result_1 = smallArray.map((row, y) => row.map((number, x) => isLowpoint(smallArray, x, y)));

console.log(result_1); */

/* function calcRiskLevels(array) {
  const lowpoints = [];
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
      if (isLowpoint(array, x, y)) {
        lowpoints.push(array[y][x]);
      }
    }
  }
  return lowpoints.reduce((accu, height) => accu + height + 1, 0);
}
const result = calcRiskLevels(inputArray);
console.log(result); */
/* const result_1 = inputArray.reduce((outerSum, row, y) => outerSum + row.filter((number, x) => isLowpoint(inputArray, x, y)).reduce((innerSum, number) => innerSum + number + 1, 0), 0);
console.log('Result part 1:', result_1); */

// Part 2

function getLowPoints(array) {
  const lowPoints = [];
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
      if (isLowpoint(array, x, y)) {
        lowPoints.push([x, y]);
      }
    }
  }
  return lowPoints;
}

const lowPoints = getLowPoints(inputArray);

function getBasinSize(array, [x, y]) {
  const adjacentBasin = [];
  if (array[y-1] !== undefined && array[y-1][x] !== 9) {
    adjacentBasin.push(array[y-1][x]);
  }
  if (array[y][x-1] !== undefined && array[y][x-1] !== 9) {
    adjacentBasin.push(array[y][x-1]);
  }
  if (array[y][x+1] !== undefined && array[y][x+1] !== 9) {
    adjacentBasin.push(array[y][x+1]);
  }
  if (array[y+1] !== undefined && array[y+1][x] !== 9) {
    adjacentBasin.push(array[y+1][x]);
  }
  
}