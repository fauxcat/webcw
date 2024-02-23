// Main Workout Clock
let timerInterval;
let s = 0;
let m = 0;
let h = 0;

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function stopTimer() {
    clearInterval(timerInterval);
    resetTimer();
}

function updateTimer() {
    s++;
    if (s == 60) {
        s = 0;
        m++;
        if (m == 60) {
            m = 0;
            h++;
        }
    }
    displayTimer();
}

function displayTimer() {
    const formattedTime = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
    document.querySelector("#timer").textContent = formattedTime;
}

function resetTimer() {
    s = 0;
    m = 0;
    h = 0;
    displayTimer();
}

let countdownNumber = document.querySelector("#countdown-number");
let countdown = 30;

countdownNumber.textContent = countdown;

setInterval(() => {
    if (countdown - 1 >= 1) {
        countdown--;
        countdownNumber.textContent = countdown;
    } else {
        countdown = 30;
        countdownNumber.textContent = countdown;
    }
}, 1000);

