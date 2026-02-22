const bodyElememt = document.querySelector("body");

const inputElement = document.querySelector(".dark-mode-input");

inputElement.checked =JSON.parse(localStorage.getItem("mode"));

function updateLocalStorage() {
    localStorage.setItem("mode", JSON.stringify(inputElement.checked));
}

inputElement.addEventListener("input", () => {    
    updateBackground();
    updateLocalStorage();
});

function updateBackground() {
    if (inputElement.checked) {
        bodyElememt.style.backgroundColor = "black";
        
    } else {
        bodyElememt.style.backgroundColor = "rgb(217, 222, 227)";
        
    }
}

updateBackground();



