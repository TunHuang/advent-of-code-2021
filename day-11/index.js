const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const inputArray = input.split('\n').map(row => row.split('').map(char => +char));

function getAdjacents(array, [y, x]) {
  const adjacents = [];
  const top = y > 0;
  const right = x < array[0].length - 1;
  const bottom = y < array.length - 1;
  const left = x > 0;
  if (top) {
    adjacents.push([y - 1, x]);
  }
  if (top && right) {
    adjacents.push([y - 1, x + 1]);
  }
  if (right) {
    adjacents.push([y, x + 1]);
  }
  if (bottom && right) {
    adjacents.push([y + 1, x + 1]);
  }
  if (bottom) {
    adjacents.push([y + 1, x]);
  }
  if (bottom && left) {
    adjacents.push([y + 1, x - 1]);
  }
  if (left) {
    adjacents.push([y, x - 1]);
  }
  if (top && left) {
    adjacents.push([y - 1, x - 1]);
  }
  return adjacents;
}

function energyStep(array) {
  // first round
  const flashingOctopus = [];
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[0].length; x++) {
      array[y][x]++;
      if (array[y][x] > 9) {
        flashingOctopus.push([y, x]);
      }
    }
  }

  flashingRecursive(array, flashingOctopus);

  let flashCounter = 0;
  for (let y = 0; y < array.length; y++) {
    for (let x = 0; x < array[y].length; x++) {
      if (array[y][x] > 9) {
        array[y][x] = 0;
        flashCounter++;
      }
    }
  }
  return flashCounter;
}

function flashingRecursive(array, flashArray) {
  const newFlashingOctopus = [];
  flashArray.forEach(coord => {
    newFlashingOctopus.push(...flash(array, coord));
  });
  if (newFlashingOctopus.length > 0) {
    flashingRecursive(array, newFlashingOctopus);
  }
}

function flash(array, coord) {
  const adjacents = getAdjacents(array, coord);
  const newFlashingOctopus = [];
  adjacents.forEach(([y, x]) => {
    if (array[y][x] === 9) {
      newFlashingOctopus.push([y, x]);
    }
    array[y][x]++;
  });
  return newFlashingOctopus;
}

function calcFlash(array, steps) {
  const arrayCopy = JSON.parse(JSON.stringify(array));
  let flashCounter = 0;
  for (let i = 0; i < steps; i++) {
    flashCounter += energyStep(arrayCopy);
  }
  return flashCounter;
}

function findSynchronStep(array) {
  const arrayCopy = JSON.parse(JSON.stringify(array));
  let i = 1;
  const octopusNumber = arrayCopy.reduce((accu, row) => accu + row.length, 0);
  while (true) {
    if (energyStep(arrayCopy) === octopusNumber) {
      return i;
    }
    i++
  }
}

const result_1 = calcFlash(inputArray, 100);
console.log('Result part 1:', result_1);
const result_2 = findSynchronStep(inputArray);
console.log('Result part 2:', result_2);