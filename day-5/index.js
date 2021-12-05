const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const inputArray = input.split('\n')
                        .map(element => element.split(' -> '))
                        .map(array => array.map(element => element.split(',').map(string => +string)));

const oceanFloor = [...new Array(1000)].map(() => new Array(1000).fill(0));

const drawLines = (lines, floor) => lines.forEach(([[x1, y1], [x2, y2]]) => {
  if (y1 === y2) {
    const [start, end] = [x1, x2].sort((a, b) => a - b);
    for (let i = start; i <= end; i++) {
      floor[y1][i]++;
    }
  } else if (x1 === x2) {
    const [start, end] = [y1, y2].sort((a, b) => a - b);
    for (let i = start; i <= end; i++) {
      floor[i][x1]++;
    }
  } else { // Part 2
    for (let i = 0; i <= Math.abs(x1 - x2); i++) {
      const x = x1 > x2 ? x1 - i : x1 + i; // variant with Math.sign const x = x1 + Math.sign(x2 - x1) * i;
      const y = y1 > y2 ? y1 - i : y1 + i;
      floor[y][x]++;
    }
  }
});

drawLines(inputArray, oceanFloor);

const getPoints = floor => floor.reduce((accu, row) => accu + row.filter(element => element > 1).length, 0);

const result = getPoints(oceanFloor);
console.log(result);