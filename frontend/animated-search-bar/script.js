const searchBarContainer = document.querySelector(".search-bar-container");
const magnifierElement = document.querySelector(".magnifier");
const searchInput = document.getElementById("input");

// set default
searchBarContainer.classList.toggle("active");

magnifierElement.addEventListener("click", (event) => {
    searchInput.focus();
    searchBarContainer.classList.toggle("active");

    // The search bar is active, so we want to close it.
    // Blur the input, which will trigger the blur event listener.
    
    togggleOff();

    
});

function togggleOff() {
    searchInput.blur();
}

magnifierElement.addEventListener("mouseenter", () => {
    searchInput.focus();
    searchBarContainer.classList.toggle("active");
    togggleOff();
});



