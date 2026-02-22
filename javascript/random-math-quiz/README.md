# 🎮 Random Math Quiz CLI

A fun command-line math quiz game that generates random arithmetic questions (addition ➕, subtraction ➖, multiplication ✖️) and keeps track of your score. Perfect for practising JavaScript functions, loops, arrays, and scope!  

## 🧠 Topics Covered

- **Functions** – declarations, expressions, and arrow functions  
- **Loops** – `while` loop for continuous gameplay  
- **Scopes** – global, function, and block scope (`let`/`const` inside loops)  
- **Arrays** – storing questions as objects  
- **Arrow functions** – used as concise callbacks  

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher) – no external dependencies needed!

## 📦 Installation

1. Clone or download this repository.  
2. Open a terminal in the project folder.  
3. (Optional) Run `npm install` – there are no external dependencies, but you can set up the project.  

## 🚀 Usage

Run the program with:

```bash
npm start
```

or directly with Node:

```bash
node index.js
```

You'll be presented with random math questions.  
- Type your answer and press Enter.  
- After each answer, you'll see if you were correct and your current score.  
- Type `"quit"` (or `"q"`) at any time to end the game and see your final score.  

Example session:
```
Welcome to the Random Math Quiz! (type "quit" to exit)

Question 1: 7 + 3 = ? 10
✅ Correct! Current score: 1

Question 2: 8 - 2 = ? 6
✅ Correct! Current score: 2

Question 3: 4 * 5 = ? 21
❌ Wrong! The answer was 20. Current score: 2

Question 4: quit
Thanks for playing! Your final score: 2/3
```

## Project Structure

The project follows a simple structure for a Node.js CLI application:

```
random-math-quiz/
│
├── package.json          # Project metadata and scripts
├── README.md             # Documentation (this file)
├── .gitignore            # Files to ignore in Git (e.g., node_modules)
└── index.js              # Main quiz application
```

### File Descriptions

- **`package.json`** – Contains project name, version, description, and scripts (e.g., `"start": "node index.js"`). Even though no external dependencies are used, it's good practice to have one.
- **`README.md`** – Documentation with setup instructions, usage, and learning outcomes.
- **`.gitignore`** – Prevents `node_modules/` and other unnecessary files from being committed.
- **`index.js`** – The main script that runs the math quiz using Node.js built-in `readline` module.

## 📝 Code Overview

The script (`index.js`) is structured to highlight key JavaScript concepts:

### 1. Strict Mode
```javascript
"use strict";
```
Ensures cleaner code and catches common mistakes (e.g., accidental global variables).

### 2. Global Variables (Score Tracking)
```javascript
let score = 0;
let questionCount = 0;
```
These are function-scoped (global to the module) and used to track progress.

### 3. Arrow Function to Generate Questions
```javascript
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
  return { question: `${a} ${op} ${b} = ?`, answer };
};
```
- Uses **arrow function** syntax.
- Returns an object with a question string and the correct answer.

### 4. Function Declaration for Game Flow
```javascript
function askQuestion() {
  // ... uses rl.question to prompt user
}
```
A traditional function declaration that handles the recursive prompting.

### 5. Recursive Loop (Alternative to `while`)
Instead of a `while` loop, the program uses **recursion** – `askQuestion` calls itself after each answer. This elegantly handles asynchronous user input while keeping the game alive until the user quits.

### 6. Block Scope with `let` and `const`
Inside the callback of `rl.question`, variables like `userAnswer` and `q` are block-scoped to that iteration, demonstrating how `let` and `const` work within blocks.

### 7. Array Iteration with Arrow Function (Optional)
You could add a summary at the end by iterating over an array of past questions using `.forEach()` with an arrow function:
```javascript
questionHistory.forEach((q, i) => {
  console.log(`${i+1}. ${q.question} (Your answer: ${q.userAnswer})`);
});
```

## 🎯 Learning Outcomes

By building and studying this project, you will:

- **Master function styles** – Write and invoke function declarations, expressions, and arrow functions; understand their differences and use cases.  
- **Control program flow** – Use a `while` loop (or recursion) to repeat actions until a condition is met, and handle user input asynchronously.  
- **Manipulate arrays** – Store question objects, access properties, and iterate over them with array methods like `.forEach()`.  
- **Understand scope** – See how variables declared with `let` and `const` behave in global, function, and block scopes (e.g., `questionCount` vs. a loop counter).  
- **Apply arrow functions as callbacks** – Use concise syntax for array iteration and event handling.  
- **Practice recursion** – Learn how a function can call itself to create a loop in an asynchronous environment.  

**Happy Coding!** 🚀