const textArea = document.getElementById("textarea");
const totalCounterElement = document.getElementById("character-counter");
const remainChar = document.getElementById("remain-char");

const maxChar = textArea.maxLength;
totalCounterElement.innerText = 0;
remainChar.innerText = maxChar;
textArea.addEventListener("keyup", () => { 
    updateCounter(maxChar);

});

function updateCounter(maxChar) {
    const currChar = textArea.value.length;
    if (currChar >= maxChar) {
        alert("Maximum Char Reached");
    }
    totalCounterElement.innerText = currChar
    remainChar.innerText = (maxChar - currChar);
}
updateCounter(maxChar);