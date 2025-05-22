const time = document.getElementById("time");
const datePara = document.getElementById("date-para");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliSeconds = document.getElementById("milli-seconds");
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
  "Februry",
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
setInterval(() => {
  let currentTime = new Date();

  const h = String(currentTime.getHours()).padStart(2, "0");
  const m = String(currentTime.getMinutes()).padStart(2, "0");
  const s = String(currentTime.getSeconds()).padStart(2, "0");
  const ms = String(currentTime.getMilliseconds()).padStart(3, "0");

  hours.innerHTML = `${h}`;
  minutes.innerHTML = `${m}`;
  seconds.innerHTML = `${s}`;
  milliSeconds.innerHTML = `${ms}`;

  datePara.innerHTML = `${
    days[currentTime.getDay()]
  }, ${months[currentTime.getMonth()]} ${currentTime.getDate()}, ${currentTime.getFullYear()}`;
}, 100);
