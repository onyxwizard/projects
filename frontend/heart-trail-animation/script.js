const bodyElement = document.querySelector("body");
bodyElement.addEventListener("mousemove", (event) => {
    const xPos = event.offsetX;
    const yPos = event.offsetY;
    const spanElement = document.createElement("span");
    spanElement.style.left = xPos + "px";
    spanElement.style.top = yPos + "px";
    // change size of heart
    const sizeMath = Math.random() * 100;
    spanElement.style.width = sizeMath + "px";
    spanElement.style.height = sizeMath + "px";
    bodyElement.append(spanElement);

    // Set time out after certain time
    setTimeout(() => {
        spanElement.remove();
    }, 3000);

});