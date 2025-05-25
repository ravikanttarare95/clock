const time = document.getElementById("time");
const datePara = document.getElementById("date-para");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
let amPM = document.getElementById("am-pm");
const btnTimeToggle = document.getElementById("btn-toggle-timer");
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
let isTimeRunning = false;
function toggleTimer() {
  if (!isTimeRunning) {
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
    updateTimerDisplay();
    isTimeRunning = true;
    btnTimeToggle.innerText = "Reset Timer";
    timeInterval = setInterval(() => {
      totalInputSeconds--;
      updateTimerDisplay();

      if (totalInputSeconds < 0) {
        clearInterval(timeInterval);
        timerPara.innerHTML =
          "<span style='color: #ff4c4c; font-weight: bold;'>Time's up!</span>";
        btnTimeToggle.innerText = "Reset Timer";
      }
    }, 1000);
  } else {
    clearInterval(timeInterval);
    timerPara.innerHTML = `<input id="timer-min" type="number" placeholder="MM" min="0"> : <input id="timer-sec"
                    type="number" placeholder="SS" min="0"></input>`;
    isTimeRunning = false;
    btnTimeToggle.innerText = "Set Timer";
  }
}

function updateTimerDisplay() {
  let countDownMin = Math.floor(totalInputSeconds / 60);
  let countDownSec = totalInputSeconds % 60;
  timerPara.innerHTML = `${String(countDownMin).padStart(2, "0")} : ${String(
    countDownSec
  ).padStart(2, "0")}`;
}
