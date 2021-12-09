const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

const inputArray = input
                     .split('\n')
                     .map(row => row.split(' | '))
                     .map(row => [row[0].split(' '), row[1].split(' ')]);

// Part 1

const result_1 = inputArray.reduce((accu, row) => accu + row[1].filter(string => string.length <= 4 || string.length === 7).length, 0);

console.log('Result part 1:', result_1);

// Part 2

const sortedStrings = inputArray.map(array => [array[0].map(string => string.split('').sort().join('')), array[1].map(string => string.split('').sort().join(''))]);

function decode(array) {
  const wiresToSegmentsTable = {};
  const stringLength2 = array[0].filter(string => string.length === 2)[0];
  const stringLength3 = array[0].filter(string => string.length === 3)[0];
  const stringLength4 = array[0].filter(string => string.length === 4)[0];
  const arrayLength5 = array[0].filter(string => string.length === 5);
  const arrayLength6 = array[0].filter(string => string.length === 6);

  let isC = false;
  for (let i = 0; i < 3; i++) {
    if (!arrayLength6[i].includes(stringLength2[0])) {
      isC = true;
      break;
    }
  }
  wiresToSegmentsTable.c = isC ? stringLength2[0] : stringLength2[1];
  wiresToSegmentsTable.f = isC ? stringLength2[1] : stringLength2[0];

  wiresToSegmentsTable.a = stringLength3.split('').filter(char => !stringLength2.includes(char))[0];
  
  const in4not2Array = stringLength4.split('').filter(char => !stringLength2.includes(char));
  let isB = false;
  for (let i = 0; i < 3; i++) {
    if (!arrayLength5[i].includes(in4not2Array[0])) {
      isB = true;
      break;
    }
  }
  wiresToSegmentsTable.b = isB ? in4not2Array[0] : in4not2Array[1];
  wiresToSegmentsTable.d = isB ? in4not2Array[1] : in4not2Array[0];
  
  const last2Array = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].filter(char => !Object.values(wiresToSegmentsTable).includes(char));
  let isE = false;
  for (let i = 0; i < 3; i++) {
    if (!arrayLength6[i].includes(last2Array[0])) {
      isE = true;
      break;
    }
  }
  wiresToSegmentsTable.e = isE ? last2Array[0] : last2Array[1];
  wiresToSegmentsTable.g = isE ? last2Array[1] : last2Array[0];

  function makeNumber(...chars) {
    const array = [];
    chars.forEach(char => array.push(wiresToSegmentsTable[char]));
    return array.sort().join('');
  }
  const zero = makeNumber('a', 'b', 'c', 'e', 'f', 'g');
  const one = makeNumber('c', 'f');
  const two = makeNumber('a', 'c', 'd', 'e', 'g');
  const three = makeNumber('a', 'c', 'd', 'f', 'g');
  const four = makeNumber('b', 'c', 'd', 'f');
  const five = makeNumber('a', 'b', 'd', 'f', 'g');
  const six = makeNumber('a', 'b', 'd', 'e', 'f', 'g');
  const seven = makeNumber('a', 'c', 'f');
  const eight = 'abcdefg';
  const nine = makeNumber('a', 'b', 'c', 'd', 'f', 'g');
  const signalsToDigitsTable = {
    [zero]: 0,
    [one]: 1,
    [two]: 2,
    [three]: 3,
    [four]: 4,
    [five]: 5,
    [six]: 6,
    [seven]: 7,
    [eight]: 8,
    [nine]: 9
  }
  return signalsToDigitsTable;
}

function calcOutput(array, table) {
  let output = '';
  array[1].forEach(string => output += table[string]);
  return +output;
}

const result_2 = sortedStrings.reduce((accu, entry) => accu + calcOutput(entry, decode(entry)), 0);
console.log('Result part 2:', result_2);