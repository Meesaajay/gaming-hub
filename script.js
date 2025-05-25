 const frame = document.getElementById('game-frame');
  const cards = document.querySelectorAll('.game-card');

  function loadGame(name) {
   if(name === 'click-race') frame.src = './games/click-race/index.html';
   else if(name === 'flappy-ball') frame.src = './games/flappy-ball/index.html';
   else if(name === 'keyboard-ninja') frame.src = './games/keyboard-ninja/index.html';
   else frame.src = '';
  }

  cards.forEach(card => {
    card.onclick = () => {
      loadGame(card.dataset.game);
      cards.forEach(c => c.style.background = '#282828');
      card.style.background = '#4caf50';
      card.style.color = '#fff';
    }
  });