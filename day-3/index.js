const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const inputArray = input.split('\n');

function getGammaRate(array) {
  const outerLength = array.length;
  const innerLength = array[0].length;
  const sumOfOnes = new Array(innerLength).fill(0);
  for (let i = 0; i < outerLength; i++) {
    for (let j = 0; j < innerLength; j++) {
      if (array[i][j] === '1') {
        sumOfOnes[j]++;
      }
    }
  }
  // generally you'd have to check if there's a case where both ones and zeros are the same number
  return sumOfOnes.map(ones => ones > outerLength / 2 ? '1' : '0').join('');
}

const gammaRate = getGammaRate(inputArray);
const epsilonRate = gammaRate.split('').map(digit => String(1 - digit)).join('');
const gammaDecimal = parseInt(gammaRate, 2);
const epsilonDecimal = parseInt(epsilonRate, 2);
console.log('Power consumption of the submarine:', gammaDecimal * epsilonDecimal);

// Part 2

function getOxygenCo2Rating(array, gas) {
  let gasArray = [...array];
  let i = 0;
  while (gasArray.length > 1) {
    const mostCommon = getMostCommonValue(gasArray, i);
    const checkValue = gas === 'oxygen' ? mostCommon : String(1 - mostCommon);
    gasArray = gasArray.filter(string => string[i] === checkValue);
    i++;
  }
  return gasArray[0];
}

function getMostCommonValue(array, digit) {
  const ones = array.reduce((accu, string) => string[digit] === '1' ? accu + 1 : accu, 0);
  if (ones > array.length / 2) {
    return '1';
  }
  if (ones < array.length / 2) {
    return '0';
  }
  return '1';
}

const oxygenRating = getOxygenCo2Rating(inputArray, 'oxygen');
const co2Rating = getOxygenCo2Rating(inputArray, 'co2');
const oxygenDecimal = parseInt(oxygenRating, 2);
const co2Decimal = parseInt(co2Rating, 2);
console.log('Life support rating of the submarine:', oxygenDecimal * co2Decimal);