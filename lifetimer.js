let isDOBOpen = false; //  this mean is close by default
let dateOfBirth;
let timerId;
const settingCogEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialText");
const afterDOBBtntxtEl = document.getElementById("afterDOBBtntxt");
const dobButtionEl = document.getElementById("dobButtion");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

const makeTwoDigitNumber = (number) => {
  return number > 9 ? number : `0${number}`;
};

const toggleDateOfBirthSelector = () => {
  if (isDOBOpen) {
    settingContentEl.classList.add("hide");
  } else {
    settingContentEl.classList.remove("hide");
  }

  isDOBOpen = !isDOBOpen;
};

const updateAge = () => {
  const currentDate = new Date();
  if (!dateOfBirth) return;

  let ageYear = currentDate.getFullYear() - dateOfBirth.getFullYear();
  let ageMonth = currentDate.getMonth() - dateOfBirth.getMonth();
  let ageDay = currentDate.getDate() - dateOfBirth.getDate();
  let ageHour = currentDate.getHours() - dateOfBirth.getHours();
  let ageMinute = currentDate.getMinutes() - dateOfBirth.getMinutes();
  let ageSecond = currentDate.getSeconds() - dateOfBirth.getSeconds();

  if (ageSecond < 0) {
    ageSecond += 60;
    ageMinute--;
  }
  if (ageMinute < 0) {
    ageMinute += 60;
    ageHour--;
  }
  if (ageHour < 0) {
    ageHour += 24;
    ageDay--;
  }
  if (ageDay < 0) {
    const prevMonthLastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    ).getDate();
    ageDay += prevMonthLastDay;
    ageMonth--;
  }
  if (ageMonth < 0) {
    ageMonth += 12;
    ageYear--;
  }

  yearEl.innerHTML = makeTwoDigitNumber(ageYear);
  monthEl.innerHTML = makeTwoDigitNumber(ageMonth);
  dayEl.innerHTML = makeTwoDigitNumber(ageDay);
  hourEl.innerHTML = makeTwoDigitNumber(ageHour);
  minuteEl.innerHTML = makeTwoDigitNumber(ageMinute);
  secondEl.innerHTML = makeTwoDigitNumber(ageSecond);
};

const contentToggler = () => {
  if (dateOfBirth) {
    initialTextEl.classList.add("hide");
    afterDOBBtntxtEl.classList.remove("hide");
  } else {
    afterDOBBtntxtEl.classList.add("hide");
    initialTextEl.classList.remove("hide");
  }
};

const setDOBHandler = () => {
  const dateString = dobInputEl.value;

  dateOfBirth = dateString ? new Date(dateString) : null;

  if (dateOfBirth) {
    if (timerId) {
      clearInterval(timerId);
    }
    updateAge();
    timerId = setInterval(updateAge, 1000);
    contentToggler();
    // Close the settings panel after setting DOB
    settingContentEl.classList.add("hide");
    isDOBOpen = false;
  }
};

contentToggler(); // Call this after attempting to load DOB

settingCogEl.addEventListener("click", toggleDateOfBirthSelector);
dobButtionEl.addEventListener("click", setDOBHandler);
