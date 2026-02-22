const hourElement = document.querySelector(".hour");
const minuteElement = document.querySelector(".minute");
const secondElement = document.querySelector(".second");
const period = document.querySelector(".time-period");

function updateTime() {
    let time = new Date();
    let hr = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let ampm = "AM";

    if (hr > 12) {
        hr = hr - 12
        ampm = "PM"
    }
    if (hr === 0) {
        hr = 12;
    }

    // Add leading zeros for consistent formatting
    hr = hr < 10 ? "0" + hr : hr;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    hourElement.innerText = hr;
    minuteElement.innerText = min;
    secondElement.innerText = sec;
    period.innerText = ampm;


    setTimeout(updateTime,1000);
}

updateTime();