const dayElement = document.getElementById("day");
const hourElement = document.getElementById("hour");
const minElement = document.getElementById("minute");
const secElement = document.getElementById("second");

const newYearDate = new Date("Jan 1, 2026 00:00:00").getTime();

// Use setInterval for a smoother, self-repeating update
const countdownInterval = setInterval(updateCountdownTime, 1000);

function updateCountdownTime() {
    const now = new Date().getTime();
    const diff = newYearDate - now;

    // Check if the countdown has finished
    if (diff < 0) {
        clearInterval(countdownInterval);
        dayElement.innerText = "0";
        hourElement.innerText = "0";
        minElement.innerText = "0";
        secElement.innerText = "0";
        // Optional: Display a message when the countdown ends
        // document.getElementById("countdown-message").innerText = "Happy New Year!";
        return;
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60; // Renamed to avoid conflict
    const day = hour * 24;

    const d = Math.floor(diff / day);
    const hr = Math.floor((diff % day) / hour);
    const min = Math.floor((diff % hour) / minute);
    const sec = Math.floor((diff % minute) / second);

    dayElement.innerText = d;
    hourElement.innerText = hr;
    minElement.innerText = min;
    secElement.innerText = sec;
}
