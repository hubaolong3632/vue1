let timer;
let startTime;
let running = false;
let elapsedTime = 0;

function startTimer() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTimer, 10); // 十秒一次
        running = true;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(timer);
        running = false;
        elapsedTime = Date.now() - startTime;
    }
}

function updateTimer() {
    let currentTime = Date.now() - startTime;
    let minutes = Math.floor(currentTime / 60000);
    let seconds = Math.floor((currentTime % 60000) / 1000);
    let milliseconds = Math.floor((currentTime % 1000) / 10);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    document.getElementById("timer").innerHTML = minutes + ":" + seconds + ":" + milliseconds;
}