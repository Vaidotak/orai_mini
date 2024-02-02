const progressBar = document.getElementById("progress");

let progress = 0;

const interval = setInterval(() => {
    progress++;
    progressBar.style.width = `${progress}%`;

    if (progress === 100) {
        clearInterval(interval);
        window.location.href = "https://www.aromatas.eu/";
    }
}, 100);
