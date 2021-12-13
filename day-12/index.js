const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

const inputArray = input.split('\n').map(entry => entry.split('-'));

class CaveSystem {
  constructor() {
    this.start = new Cave('start');
    this.caves = [this.start];
  }
  add(cave) {
    this.caves.push(cave);
  }
  addConnection(array) {
    let cave1 = this.caves.find(cave => cave.name === array[0]);
    if (!cave1) {
      cave1 = new Cave(array[0]);
      this.add(cave1);
    }
    let cave2 = this.caves.find(cave => cave.name === array[1]);
    if (!cave2) {
      cave2 = new Cave(array[1]);
      this.add(cave2);
    }
    cave1.add(cave2);
    cave2.add(cave1);
  }
  findAllPaths() {
    const allPaths = [];
    
    function findPathHelper(cave, pathArray = [], visited = [], twice = false) {
      const openLinked = cave.linkedTo.filter(linkedCave => linkedCave.name !== 'start' && !visited.find(visitedCave => visitedCave.name === linkedCave.name));
      let linkedVisited = [];
      if (!twice) {
        linkedVisited = cave.linkedTo.filter(linkedCave => linkedCave.name !== 'start' && visited.find(visitedCave => visitedCave.name === linkedCave.name));
      }
      if (openLinked.length === 0 && linkedVisited.length === 0) {
        return;
      }
      pathArray.push(cave.name);
      if (cave.name === 'end') {
        allPaths.push(pathArray);
        return;
      }
      if (!cave.isBig && !visited.find(visitedCave => visitedCave.name === cave.name)) {
        visited.push(cave);
      }
      openLinked.forEach(linkedCave => {
        findPathHelper(linkedCave, [...pathArray], [...visited], twice);
      });
      linkedVisited.forEach(linkedVisitedCave => findPathHelper(linkedVisitedCave, [...pathArray], [...visited], true));
    }
    findPathHelper(this.start);
    return allPaths;
  }
}

class Cave {
  constructor(name) {
    this.name = name;
    this.isBig = name[0] === name[0].toUpperCase();
    this.linkedTo = [];
  }
  add(cave) {
    if (!this.linkedTo.find(linkedCave => linkedCave === cave)) {
      this.linkedTo.push(cave);
    }
  }
}

const caveSystem = new CaveSystem();
console.log('after creation:', caveSystem);
inputArray.forEach(connection => caveSystem.addConnection(connection));
console.log('after adding connections', caveSystem);
const result = caveSystem.findAllPaths();
// console.log('paths:', result);
console.log('number of paths:', result.length);