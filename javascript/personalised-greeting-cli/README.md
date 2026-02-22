# Personalised Greeting CLI

A command-line program that asks for your name, age, and favourite colour, then prints a personalised message. Built to practice fundamental JavaScript concepts in a Node.js environment.

## Topics Covered

- Lexical Structure (comments, semicolons, whitespace)
- Variables (`let`, `const`)
- Data Types (string, number, boolean)
- Expressions (e.g., calculating birth year)
- Template Literals
- Strict Mode (`"use strict"`)

## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)

## Project Structure

A simple Node.js CLI project typically has the following structure:

```
personalised-greeting-cli/
│
├── package.json          # Project metadata and dependencies (if any)
├── README.md             # Project documentation
├── .gitignore            # Files to ignore in Git (e.g., node_modules)
└── index.js              # Main application code
```

### Explanation of Files

- **`package.json`** – Contains project name, version, description, and scripts. Even for a simple CLI, it's good practice to have one.
- **`README.md`** – Documentation explaining the project, how to use it, and what you'll learn.
- **`.gitignore`** – Prevents unnecessary files (like `node_modules`) from being committed to version control.
- **`index.js`** – The main script that runs the greeting program.

### Sample `package.json`

```json
{
  "name": "personalised-greeting-cli",
  "version": "1.0.0",
  "description": "A simple CLI that asks for user details and prints a personalised message.",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "keywords": ["node", "cli", "greeting", "learning"],
  "author": "Your Name",
  "license": "MIT"
}
```

### Sample `.gitignore`

```
node_modules/
.env
```


## Installation

1. Clone or download this repository.
2. Open a terminal in the project folder.
3. (Optional) Run `npm install` – there are no external dependencies, but you can set up the project.

## Usage

Run the program with:

```bash
npm start
```

or directly with Node:

```bash
node index.js
```

You will be prompted to enter:

- Your name
- Your age
- Your favourite colour

After providing the information, the program will display a personalised greeting that includes:

- A welcome message with your name
- The year you were born (approximately, based on current year)
- A fun fact about your favourite colour (using a simple boolean check)

## Code Overview

The script (`index.js`) does the following:

1. Enables **strict mode** with `"use strict";` at the top.
2. Uses `const` for the readline interface (won't be reassigned).
3. Uses `let` for variables that will change (user inputs).
4. Prompts the user with `rl.question()` and handles input.
5. Converts the age input to a number.
6. Calculates an approximate birth year using the current year.
7. Uses **template literals** to build the personalised message.
8. Demonstrates **boolean** usage by checking if the favourite colour is "blue".
9. Closes the readline interface and exits.



## Learning Outcomes

By building and studying this project, you will:

- **Understand how to write and run a basic Node.js script** – You'll set up a project, use the `readline` module, and execute your code.
- **Get comfortable with variables, primitive types, and template strings** – You'll declare variables with `let` and `const`, work with strings and numbers, and use template literals for readable string interpolation.
- **Know the effect of strict mode** – You'll see how `"use strict"` prevents common mistakes (like using undeclared variables) and enforces better coding practices.

Additionally, you'll gain experience with:

- Handling asynchronous user input in Node.js.
- Converting between data types.
- Writing simple expressions and using booleans for conditional logic.
- Organising a small project with proper documentation.



## Summary

1. **Basic Node.js Scripting** – Running a script with Node, using built-in modules (`readline`).
2. **Variables & Data Types** – Using `let` and `const`, distinguishing between string, number, and boolean.
3. **Template Literals** – Constructing dynamic strings with embedded expressions.
4. **Expressions** – Calculating birth year using the current year and age.
5. **Strict Mode** – Understanding its role in catching errors and enforcing cleaner code.
6. **Lexical Structure** – Observing the role of comments, semicolons, and whitespace in code readability and execution.

This project serves as a hands-on introduction to fundamental JavaScript concepts in a real-world CLI context.


**Happy Coding!** 🚀

