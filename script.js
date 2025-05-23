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
