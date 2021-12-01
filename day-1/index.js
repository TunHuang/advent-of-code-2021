const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const inputArray = input.split('\n');

// Part 1

function countIncreased(array) {
  let counter = 0;
  for (let i = 1; i < array.length; i++) {
    if (+array[i] > +array[i - 1]) {
      counter++
    }
  }
  return counter;
}

const result1 = countIncreased(inputArray);
console.log(result1);

// Part 2

const slidingWindowArray = [];

for (let i = 0; i < inputArray.length - 2; i++) {
  slidingWindowArray.push(+inputArray[i] + +inputArray[i + 1] + +inputArray[i + 2])
}

const result2 = countIncreased(slidingWindowArray);
console.log(result2);

