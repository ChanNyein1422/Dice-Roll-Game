'use strict';
let nowScore, currentPlayer, scores, playing;
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const showModal = document.querySelector('.btn--howTo');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const btnOpenModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const btnCloseModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const init = function () {
  // document.querySelector(`.player--${currentPlayer}`).classList.remove('');
  playing = true;
  nowScore = 0;
  currentPlayer = 0;
  scores = [0, 0];
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  dice.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

const switchPlayer = function () {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  nowScore = 0;
};
const winPlayer = function () {
  playing = false;
  document.getElementById(`score--${currentPlayer}`).textContent =
    nowScore + scores[currentPlayer];
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
  dice.classList.add('hidden');
};

const rollDice = function () {
  if (playing === true) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNum}.png`;
    if (diceNum !== 1) {
      nowScore += diceNum;
      document.getElementById(`current--${currentPlayer}`).textContent =
        nowScore;
    } else {
      switchPlayer();
    }
    if (nowScore + scores[currentPlayer] >= 100) {
      winPlayer();
    }
  }
};
const holdTurn = function () {
  if (playing === true) {
    scores[currentPlayer] += nowScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];
    if (scores[currentPlayer] >= 100) {
      winPlayer();
    } else {
      switchPlayer();

      dice.classList.add('hidden');
    }
  }
};
//////////////////////////////////////////////////////////////////
showModal.addEventListener('click', btnOpenModal);
closeModal.addEventListener('click', btnCloseModal);
overlay.addEventListener('click', btnCloseModal);
document.addEventListener('keydown', function (e) {
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) {
    btnCloseModal();
  }
});
/////////////////////////////////////////////////////////////////////
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');
init();
roll.addEventListener('click', rollDice);
hold.addEventListener('click', holdTurn);
newGame.addEventListener('click', init);
