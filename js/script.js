const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelectorAll('.cloud');
const gameBoard = document.querySelector('.game-board');

let isGameOver = false;
let loop = null;

const jump = () => {
  if (isGameOver) return;
  if (mario.classList.contains('jump')) return;
  mario.classList.add('jump');
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
};

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', (e) => {
  e.preventDefault();
  jump();
}, { passive: false });

function gameOver() {
  isGameOver = true;

  if (loop) clearInterval(loop);
  pipe.style.animation = 'none';
  clouds.forEach(c => c.style.animation = 'none');

  const pipeRect = pipe.getBoundingClientRect();
  const marioRect = mario.getBoundingClientRect();
  const boardRect = gameBoard.getBoundingClientRect();
  const newBottom = Math.max(0, boardRect.bottom - marioRect.bottom);

  mario.style.animation = 'none';
  mario.style.bottom = `${newBottom}px`;
  mario.style.position = 'absolute';
  mario.src = 'images/game-over.png';
  mario.style.width = '75px';
  mario.style.marginLeft = '50px';

  gameBoard.classList.add('stopped');
  
  clearInterval(loop);
}

loop = setInterval(() => {
  const pipeRect = pipe.getBoundingClientRect();
  const pipeLeft = pipeRect.left;
  const marioRect = mario.getBoundingClientRect();
  const marioBottomStr = window.getComputedStyle(mario).getPropertyValue('bottom');
  const marioBottom = +marioBottomStr.replace('px', '') || 0;

  if (pipeLeft <= (marioRect.left + 120) && pipeLeft + pipeRect.width > marioRect.left) {
    if (marioBottom < 110 && pipeLeft > 0) {
      gameOver();
    }
  }

  if (isGameOver) {
    clearInterval(loop);
  }
}, 10);
