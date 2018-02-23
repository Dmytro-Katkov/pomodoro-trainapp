//find elements
const min = document.getElementById('min');
const sec = document.getElementById('sec');
const sound = document.querySelector('audio');
const element = document.querySelector('.pomodoro');

//application constants
const pomodoroDuration = 1000 * 60 * 25;
const shortBreakDuration = 1000 * 60 * 5;
const longBreakDuration = 1000 * 60 * 15;

//helper variables
let pomodoro, shortBreak, current, intervalId;


function tick(period){
  let diff = period - new Date().getTime();
  if(diff > 0){
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    min.innerHTML = minutes >= 10 ? minutes : `0${minutes}`;
    sec.innerHTML = seconds >= 10 ? seconds : `0${seconds}`;
  } else {
    sound.play();
    clearInterval(intervalId);
    next();
  }
}

function next(){
  switch(current){
    case 'pomodoro':
      shortBreak = new Date().getTime() + shortBreakDuration;
      tick(shortBreak);
      intervalId = setInterval(tick, 1000, shortBreak);
      current = 'short';
      element.classList.remove('bg-danger');
      element.classList.add('bg-warning');
      break;
    case 'short':
      pomodoro = new Date().getTime() + pomodoroDuration;
      tick(pomodoro);
      intervalId = setInterval(tick, 1000, pomodoro);
      current = 'pomodoro';
      element.classList.remove('bg-warning');
      element.classList.add('bg-danger');
      break;
  }
}

//initial setup of the application state
pomodoro = new Date().getTime() + pomodoroDuration;
current = 'pomodoro';
intervalId = setInterval(tick, 1000, pomodoro);

