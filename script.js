const time = document.getElementById("time");
const datePara = document.getElementById("date-para");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
let amPM = document.getElementById("am-pm");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let is24HourFormat = true;

setInterval(() => {
  let currentTime = new Date();

  let h = currentTime.getHours();
  const m = String(currentTime.getMinutes()).padStart(2, "0");
  const s = String(currentTime.getSeconds()).padStart(2, "0");

  let period = "";

  if (!is24HourFormat) {
    period = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    amPM.style.display = "inline";
  } else {
    amPM.style.display = "none";
  }

  const hours12 = String(h).padStart(2, "0");

  hours.innerHTML = `${hours12}`;
  minutes.innerHTML = `${m}`;
  seconds.innerHTML = `${s}`;
  amPM.innerText = is24HourFormat ? "" : `${period}`;

  datePara.innerHTML = `${days[currentTime.getDay()]}, ${
    months[currentTime.getMonth()]
  } ${currentTime.getDate()}, ${currentTime.getFullYear()}`;
}, 500);

function getTheme() {
  return localStorage.getItem("theme");
}

window.onload = function () {
  const currentTheme = getTheme();
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
};

function toggleTheme() {
  const currentTheme = getTheme();
  if (currentTheme === "dark") {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  }
}

function toggleHour() {
  is24HourFormat = !is24HourFormat;
}

const timerPara = document.getElementById("timer-para");
let timeInterval;
let totalInputSeconds = 0;

function setTimer() {
  clearInterval(timeInterval);

  const timerInputMin =
    parseInt(document.getElementById("timer-min").value) || 0;
  const timerInputSec =
    parseInt(document.getElementById("timer-sec").value) || 0;

  if (
    isNaN(timerInputMin) ||
    timerInputMin < 0 ||
    isNaN(timerInputMin) ||
    timerInputMin < 0
  ) {
    alert("Please enter valid non-negative numbers for minutes and seconds.");
    return;
  }

  totalInputSeconds = parseInt(timerInputMin) * 60 + parseInt(timerInputSec);

  if (totalInputSeconds <= 0) {
    alert("Enter a valid number greater than zero.");
    return;
  }
  timeInterval = setInterval(() => {
    let countDownMin = Math.floor(totalInputSeconds / 60);
    let countDownSec = totalInputSeconds % 60;
    timerPara.innerHTML = `${String(countDownMin).padStart(2, "0")} : ${String(
      countDownSec
    ).padStart(2, "0")}`;

    totalInputSeconds--;

    if (totalInputSeconds < 0) {
      clearInterval(timeInterval);
      timerPara.innerHTML = "Time's up!";
    }
  }, 1000);
}
