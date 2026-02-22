const divElement = document.querySelector(".container");

const careers = ["Youtuber", "Developer", "Cyber Analyst", "CIA"];


let careerIndex = 0;
let charIndex = 0;

updateText();

function updateText() {
    charIndex++;
    divElement.innerHTML = `<h1>Im a ${careers[careerIndex].slice(0, charIndex)}</h1>`;    
    if (charIndex === careers[careerIndex].length) {
        careerIndex++;
        charIndex = 0;
    }

    if (careerIndex === careers.length) {
        careerIndex = 0;
    }
    setTimeout(updateText, 400);
} 
