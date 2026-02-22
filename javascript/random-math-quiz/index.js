"use strict";
/**
 * @author onyxwizard
 * @date 23-02-2026
 */

let score = 0;
let questionCount = 1;

const readline = require('readline');
const r = readline.createInterface(
  {
    input: process.stdin,
    output : process.stdout
  }
)

const generateQuestion = () => {
  const operators = ['+', '-', '*'];
  const op = operators[Math.floor(Math.random() * operators.length)];
  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;
  let answer;
  switch (op) {
    case '+': answer = a + b; break;
    case '-': answer = a - b; break;
    case '*': answer = a * b; break;
  }
  return { question: `${a} ${op} ${b} = ?`, solution:answer };
};

console.log("Welcome to the Random Math Quiz!");
console.log();
function askQuestion() {
  // ... uses rl.question to prompt user
  let q = generateQuestion();
  r.question(`Question ${questionCount} : ${q.question} `, (ans) => {
    score += ans == q.solution ? 1 : 0;
    questionCount++;
    let check = ans == q.solution ? '✅ Correct!' : `❌ Wrong! The answer was ${q.solution}`;
    let output = `${check} Current score: ${score}`
    console.log(output);
    console.log();
    r.question("Do you want to continue (y/n) : ", (ans) => {
      if (ans === 'y' || ans === 'yes') {
        askQuestion();
      } else {
        console.log(output);
        console.log();
        r.close();
        console.log("Program End");
      }
    })
  })
}

askQuestion();
