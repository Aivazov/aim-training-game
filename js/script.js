const refs = {
  startBtn: document.querySelector('#start'),
  timeList: document.querySelector('#time-list'),
  timeEl: document.querySelector('#time'),
  board: document.querySelector('#board'),
  screens: document.querySelectorAll('.screen'),
  time: 5,
  score: 0,
};

refs.startBtn.addEventListener('click', (e) => {
  e.preventDefault();

  refs.screens[0].classList.add('up');
});

refs.timeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('time-btn')) {
    refs.time = parseInt(e.target.getAttribute('data-time'));
    refs.screens[1].classList.add('up');
  }
});

refs.board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    refs.score += 1;
    e.target.remove();
    createRandomCircle();
  }
});

startGame();

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(refs.time);
}

function decreaseTime() {
  if (refs.time === 0) {
    finishGame();
  } else {
    let current = --refs.time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const { height, width } = refs.board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add('circle');
  circle.style.background = `linear-gradient(118.38deg, ${getRandomHexColor()} -4.6%, ${getRandomHexColor()} 200.44%)`;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  refs.board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function finishGame(params) {
  refs.board.innerHTML = `<h1>Your score: <span class="primary">${refs.score}</span>`;
}

function setTime(value) {
  refs.timeEl.innerHTML = `00:${value}`;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
