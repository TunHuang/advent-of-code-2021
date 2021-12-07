const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

const inputArray = input.split(',').map(string => +string);

const calcDiffsum = (array, number) => array.reduce((accu, curr) => accu + Math.abs(curr - number), 0);
// Part 2
const calcTriangularNumber = n => n * (n + 1) / 2;
const calcTriangularsum = (array, number) => array.reduce((accu, curr) => accu + calcTriangularNumber(Math.abs(curr - number)), 0);

function findFuelcost(array, calc) {
  // initial position
  const min = Math.min(...array);
  const max = Math.max(...array);
  const initialPosition = Math.floor((min + max) / 2);
  const initialCost = calc(array,initialPosition);

  function searchFuelcost(array, position, currentCost) {
    const valueUp = calc(array, position + 1);
    if (valueUp < currentCost) {
      return searchUp(array, position + 1, valueUp);
    }
    const valueDown = calc(array, position - 1);
    if (valueDown < currentCost) {
      return searchDown(array, position - 1, valueDown);
    }
    return currentCost;
  }

  function searchUp(array, position, currentCost) {
    const valueUp = calc(array, position + 1);
    if (valueUp < currentCost) {
      return searchUp(array, position + 1, valueUp);
    }
    return currentCost;
  }

  function searchDown(array, position, currentCost) {
    const valueDown = calc(array, position - 1);
    if (valueDown < currentCost) {
      return searchDown(array, position - 1, valueDown);
    }
    return currentCost;
  }
  const result = searchFuelcost(array, initialPosition, initialCost);
  return result;
}

const result_1 = findFuelcost(inputArray, calcDiffsum);
console.log('fuel cost part 1:', result_1);
const result_2 = findFuelcost(inputArray, calcTriangularsum);
console.log('fuel cost part 2:', result_2);