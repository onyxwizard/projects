"use strict";

/**
 * @author onyxwizard
 * @date 22-02-2026
 */

// import the input interface
const readLine = require("readline");

// instantiate
const r = readLine.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let name, age, favColor;

r.question("Whats your name : ", (ans) => {
	name = ans;

	r.question("Whats your age: ", (ans) => {
		age = ans;

		r.question("Whats your Favourite color: ", (ans) => {
			favColor = ans;

			let birthYear = 2026 - age;
			// let isBlue = "blue" | "Blue";
			console.log(
				` Hello ${name}!
          You were born around ${birthYear}.
          Your favourite colour is ${favColor}. 
          ${favColor.toLocaleLowerCase === "blue" ? "Blue is a calm colour!" : "That's a great colour choice!"}`,
			);
			r.close();
		});
	});
});
