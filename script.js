const progressBar = document.getElementById("progress");

let progress = 0;

const interval = setInterval(() => {
    progress++;
    progressBar.style.width = `${progress}%`;

    if (progress === 100) {
        clearInterval(interval);
        window.location.href = "https://www.google.com/"; // Pakeiskite šią nuorodą į savo puslapio nuorodą
    }
}, 100);
