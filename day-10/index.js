const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const inputArray = input.split('\n');

function findAndCalcIllegalChar(string) {
  const openChars = '{[(<';
  const closeChars = '}])>';
  const stack = [];
  const pointsTable = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  };
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (openChars.includes(char)) {
      stack.push(char);
    } else if (closeChars[openChars.indexOf(stack[stack.length - 1])] === char) {
      stack.pop();
    } else {
      return pointsTable[char];
    }
  }
  return 0;
}

const result_1 = inputArray.reduce((accu, curr) => accu + findAndCalcIllegalChar(curr), 0);
console.log('Result part 1:', result_1);

// Part 2

function getIncompleteStrings(array) {
  const openChars = '{[(<';
  const closeChars = '}])>';
  const stack = [];
  const incompleteStrings = [];
  outerFor:
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      const char = array[i][j];
      if (openChars.includes(char)) {
        stack.push(char);
      } else if (closeChars[openChars.indexOf(stack[stack.length - 1])] === char) {
        stack.pop();
      } else {
        continue outerFor;
      }
    }
    incompleteStrings.push(array[i]);
  }
  return incompleteStrings;
}

function calcIncomplete(string) {
  const openChars = '{[(<';
  const stack = [];
  const pointsTable = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
  };
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (openChars.includes(char)) {
      stack.push(char);
    } else {
      stack.pop();
    }
  }
  const points = stack.reduceRight((accu, curr) => accu * 5 + pointsTable[curr], 0)
  return points;
}

function getMiddleScore(array) {
  const scores = [];
  for (let i = 0; i < array.length; i++) {
    scores.push(calcIncomplete(array[i]));
  }
  scores.sort((a, b) => a - b);
  return scores[(scores.length - 1) / 2];
}

const incompleteStrings = getIncompleteStrings(inputArray);
const result_2 = getMiddleScore(incompleteStrings);
console.log('Result part 2:', result_2);