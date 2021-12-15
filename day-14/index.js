const fs = require('fs');
const input = fs.readFileSync('input.txt').toString();

const smallSample = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const [template, insertionString] = input.split('\n\n');
// const [template, insertionString] = smallSample.split('\n\n');
const insertionArray = insertionString.split('\n').map(rule => rule.split(' -> '));

function insertionStep(polymer, rulesArray) {
  const insertions = [];
  rulesArray.forEach(rule => {
    let index = -1;
    do {
      index = polymer.indexOf(rule[0], index + 1);
      if (index >= 0) {
        insertions.push([index + 1, rule[1]]);
      }
    } while (index >= 0);
  });
  const polymerArray = polymer.split('');
  insertions.sort((a, b) => b[0] - a[0]);
  insertions.forEach(insertion => polymerArray.splice(insertion[0], 0, insertion[1]));
  return polymerArray.join('');
}

/* let polymer = template;

for (let i = 0; i < 10; i++) {
  polymer = insertionStep(polymer, insertionArray);
}

const charTable = {};
for (const char of polymer) {
  if (!charTable[char]) {
    charTable[char] = 1;
  } else {
    charTable[char]++;
  }
}
const charValues = Object.values(charTable);
charValues.sort((a, b) => a - b);
const result_1 = charValues[charValues.length - 1] - charValues[0];
console.log(result_1); */

// step 2

// console.log(insertionArray);

/* function insertionStep2(polymer, rulesArray) {
  const rules = [];
  rulesArray.forEach(rule => {
    let index = -1;
    do {
      index = polymer.indexOf(rule[0], index + 1);
      if (index >= 0) {
        rules.push(rule)
      }
    } while (index >= 0);
  });
  return rules;
}

const result = insertionStep2('NSV', insertionArray);
console.log(result); */

function upgradeRules(rulesArray) {
  rulesArray.forEach(ruleToUpgrade => {
    const string = ruleToUpgrade[0][0] + ruleToUpgrade[1] + ruleToUpgrade[0][1];
    const associatedRules = [];
    rulesArray.forEach(ruleToApply => {
      let index = -1;
      do {
        index = string.indexOf(ruleToApply[0], index + 1);
        if (index >= 0) {
          associatedRules.push(ruleToApply);
        }
      } while (index >= 0);
    });
    ruleToUpgrade.push(associatedRules, 0, 0, 0);
  })
}
const templatePairs = new Set();
for (let i = 0; i < template.length - 1; i++) {
  templatePairs.add(template.slice(i, i + 2));
}

console.log(templatePairs);
const templatePairsArray = Array.from(templatePairs);
console.log(templatePairsArray);
const templatePairsArray2 = templatePairsArray.map(item => [item, '']);
insertionArray.push(...templatePairsArray2);
console.log(insertionArray);

upgradeRules(insertionArray);
console.log(insertionArray);

function applyRulesOnce(polymer, rulesArray) {
  for (let i = 0; i < rulesArray.length - 1 - templatePairs.size; i++) {
    let index = -1;
    do {
      index = polymer.indexOf(rulesArray[i][0], index + 1);
      if (index >= 0) {
        rulesArray[i][3]++;
        rulesArray[i][5]++;
      }
    } while (index >= 0);
  }
}

applyRulesOnce(template, insertionArray);
console.log('after once', insertionArray);



for (let i = 0; i < 39; i++) {
  insertionArray.forEach(rule => {
    for (const associatedRule of rule[2]) {
      associatedRule[4] += rule[3];
      associatedRule[5] += rule[3];
    }
  });
  insertionArray.forEach(rule => {
    rule[3] = rule[4];
    rule[4] = 0;
  });
}

console.log('end result:', insertionArray);

const charTable = {};
for (const char of template) {
  if (!charTable[char]) {
    charTable[char] = 1;
  } else {
    charTable[char];
  }
}
console.log(charTable);
for (const rule of insertionArray) {
  if (!charTable[rule[1]]) {
    charTable[rule[1]] = rule[5];
  } else {
    charTable[rule[1]] += rule[5];
  }
}
console.log(charTable);
const charValues = Object.values(charTable);
charValues.sort((a, b) => a - b);
console.log(charValues);
const result_1 = charValues[charValues.length - 1] - charValues[0];
console.log(result_1);