const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();
const inputArray = input.split(',');

const lanternfishSchool = {};
for (let i = 0; i < 9; i++) {
  lanternfishSchool[i] = 0;
}

inputArray.forEach(fishTimer => {
  lanternfishSchool[fishTimer]++;
});

function grow(schoolObj) {
  const tempZero = schoolObj[0];
  for (let i = 0; i < 8; i++) {
    schoolObj[i] = schoolObj[i + 1];
  }
  schoolObj[8] = tempZero;
  schoolObj[6] += tempZero;
}

function numberAfterDays(schoolObj, days) {
  const schoolCopy = {...schoolObj};
  for (let i = 0; i < days; i++) {
    grow(schoolCopy);
  }
  return Object.values(schoolCopy).reduce((accu, curr) => accu + curr);
}

const result_80Days = numberAfterDays(lanternfishSchool, 80);
console.log('number after 80 days:', result_80Days);
const result_256Days = numberAfterDays(lanternfishSchool, 256);
console.log('number after 256 days:', result_256Days);