const daysPar = document.querySelector("#days");

const hoursPar = document.querySelector("#hours");

const minPar = document.querySelector("#minutes");

const secPar = document.querySelector("#seconds");

let myDate = "1 jan 2023";

function countdown() {
    let currentDate = new Date();
    let targetDate = new Date(myDate);
    const countdown = targetDate - currentDate;
    const seconds = Math.floor(countdown / 1000);
    daysPar.innerHTML = Math.floor(seconds / 60 / 60 / 24);
    hoursPar.innerHTML = Math.floor(seconds / 60 / 60 % 24);
    minPar.innerHTML = Math.floor(seconds / 60 % 60);
    secPar.innerHTML = Math.floor(seconds % 60);
}

countdown();

setInterval(countdown, 1000);
