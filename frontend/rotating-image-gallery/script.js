const imageContainerElement = document.querySelector(".image-container");

const prevElement = document.getElementById("prev");
const nextElement = document.getElementById("next");

let x = 0;
// clear set timeout by
let timer;


prevElement.addEventListener("click", () => {
    x += 45;
    clearTimeout(timer);
    updateGallery();
});


nextElement.addEventListener("click", () => {
    x -= 45;
    clearTimeout(timer);
    updateGallery();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        x += 45;
        clearTimeout(timer);
        updateGallery();
    } else if (event.key === 'ArrowRight') { 
        x -= 45;
        clearTimeout(timer);
        updateGallery();
    }

})

function updateGallery() {
    imageContainerElement.style.transform = `perspective(1000px) rotateY(${x}deg)`;

    timer = setTimeout(() => {
        x += 45;
        updateGallery();
    }, 3000);
};

updateGallery();