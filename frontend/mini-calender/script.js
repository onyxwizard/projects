const month = document.getElementById("month-name");
const day = document.getElementById("day-name");
const date = document.getElementById("date");
const year = document.getElementById("year");

// Lets use built in date
const systemTime = new Date();

// Get all values of date
// const systemMonth = systemTime.getMonth();
// const systemDay = systemTime.getDay();
// const systemDate = systemTime.getDate();
// const systemYear = systemTime.getFullYear();



month.innerText = systemTime.toLocaleString("en", {
    month: "long"
});

day.innerText = systemTime.toLocaleString("en", {
    weekday: "long"
});

date.innerText = systemTime.toLocaleString("en", {
    day: "2-digit"
});

year.innerText = systemTime.toLocaleString("en", {
    year: "numeric"
});

