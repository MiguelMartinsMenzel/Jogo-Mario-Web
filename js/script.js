const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const bgMusic = document.getElementById('bg-music');

let isGameOver = false;

function startMusic() {
  if (bgMusic && bgMusic.paused && !isGameOver) {
    bgMusic.volume = 0.5;
    bgMusic.play().catch(err => console.log('Erro ao tocar áudio:', err));
  }
}

document.addEventListener('keydown', startMusic);
document.addEventListener('click', startMusic);
document.addEventListener('touchstart', startMusic);


const jump = () => {
  if (isGameOver) return;
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
};

document.addEventListener('keydown', jump);

const restartBtn = document.getElementById('restart-btn');

if (restartBtn) restartBtn.style.display = 'none';

function showRestart() {
  if (!restartBtn) return;
  restartBtn.style.display = 'inline-block';
}

if (restartBtn) {
  restartBtn.addEventListener('click', () => {
    location.reload();
  });
}

const loop = setInterval(() => {
  const pipeRect = pipe.getBoundingClientRect();
  const pipeLeft = pipeRect.left;
  const marioRect = mario.getBoundingClientRect();

  const marioBottomStr = window.getComputedStyle(mario).getPropertyValue('bottom');
  const marioBottom = parseFloat(marioBottomStr) || 0;

  if (pipeLeft <= (marioRect.left + 120) && pipeLeft + pipeRect.width > marioRect.left) {
    if (marioBottom < 80 && pipeLeft > 0) {
      pipe.style.animation = 'none';
      pipe.style.right = 'auto';              
      pipe.style.left = `${pipeRect.left}px`;  

      mario.style.animation = 'none';
      mario.style.bottom = `${marioBottom}px`;

      mario.src = 'images/game-over.png';
      mario.style.width = '100px';
      mario.style.marginLeft = '50px';

      isGameOver = true;

        if (bgMusic) {
          try {
            bgMusic.pause();
            bgMusic.currentTime = 0;
            console.log('Música pausada.');
          } catch (e) {
            console.warn('Erro ao pausar música:', e);
          }
        }

        clearInterval(loop);
        showRestart();

            }
          }

          if (isGameOver) {
            clearInterval(loop);
          
  }
}, 10);

