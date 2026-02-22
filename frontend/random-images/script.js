const divContainer = document.querySelector(".container");
const btnElement = document.querySelector(".btn");

btnElement.addEventListener("click", ()=>{
    let loopRange = 8
    addImages(loopRange);
    });

function addImages(loopRange) {
    for (let i = 0; i < loopRange; i++) {
        const createImg = document.createElement("img");
        const number = Math.round(Math.random() * 2000);
        createImg.src = `https://picsum.photos/300?random=${number}`;
        divContainer.appendChild(createImg);
    };
}