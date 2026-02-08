import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const nowDate = new Date();

    if (nowDate >= userSelectedDate) {
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });

      btnStart.disabled = true;
      userSelectedDate = null;
      return;
    }
    btnStart.disabled = false;
    },};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const btnStart = document.querySelector("[data-start]");
btnStart.disabled = true;
const input = document.querySelector("#datetime-picker");

const dayshtml = document.querySelector("[data-days]");
const hourshtml = document.querySelector("[data-hours]");
const minuteshtml = document.querySelector("[data-minutes]");
const secondshtml= document.querySelector("[data-seconds]");

let userSelectedDate;

flatpickr(input,options);


let timerId = null;
btnStart.addEventListener("click", () => {
  btnStart.disabled = true;
  input.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const diff = userSelectedDate - now;

    if (diff <= 0) {
      clearInterval(timerId);
      updateTimer(0);

      input.disabled = false;
      btnStart.disabled = true;
      return;
    }

    updateTimer(diff);
  }, 1000);
});


function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  dayshtml.textContent = addLeadingZero(days);
  hourshtml.textContent = addLeadingZero(hours);
  minuteshtml.textContent = addLeadingZero(minutes);
  secondshtml.textContent = addLeadingZero(seconds);
}
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}


