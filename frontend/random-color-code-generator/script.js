const getColorContainer = document.querySelector(".container");

maxColor = 30;

function updateColor(maxColor) {
    for (let i = 0; i < maxColor; i++){
        const newDiv = document.createElement("div");
        newDiv.classList.add("color-container");
        const randomValue = Math.floor(100000 + Math.random() * 900000);
        newDiv.innerText = `#${randomValue}`;
        newDiv.style.backgroundColor = `#${randomValue}`;
        getColorContainer.appendChild(newDiv);
    }
}

updateColor(maxColor);