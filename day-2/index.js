const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

const inputArray = input.split('\n').map(command => command.split(' ')).map(command => [command[0], +command[1]]);

// Part 1

const position = {horizontal: 0, depth: 0};

for (const [command, value] of inputArray) {
  switch (command) {
    case 'forward':
      position.horizontal += value;
      break;
    case 'down':
      position.depth += value;
      break;
    case 'up':
      position.depth -= value;
      break;
    default:
      console.log('invalid command:', command, value);
      break;
  }
}

console.log(position);
console.log('part 1 result:', position.horizontal * position.depth);

// Part 2

const submarine = {
  position: {
    horizontal: 0,
    depth: 0
  },
  aim: 0
}

for (const [command, value] of inputArray) {
  switch (command) {
    case 'forward':
      submarine.position.horizontal += value;
      submarine.position.depth += submarine.aim * value;
      break;
    case 'down':
      submarine.aim += value;
      break;
    case 'up':
      submarine.aim -= value;
      break;
    default:
      console.log('invalid command:', command, value);
      break;
  }
}

console.log(submarine);
console.log('part 2 result:', submarine.position.horizontal * submarine.position.depth);