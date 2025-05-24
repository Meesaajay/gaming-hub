 const bird = document.getElementById("bird");
    const game = document.getElementById("game");
    const scoreDisplay = document.getElementById("score");
    const menu = document.getElementById("menu");

    let birdY = 200;
    let velocity = 0;
    let gravity = 0.6;
    let isGameOver = false;
    let score = 0;
    let pipes = [];
    let pipeInterval;
    let pipeGap = 150;

    function jump() {
      if (isGameOver) return;
      velocity = -10;
      bird.style.transform = "rotate(-20deg)";
      setTimeout(() => bird.style.transform = "rotate(10deg)", 200);
    }

    document.addEventListener("keydown", e => {
      if (e.code === "Space") jump();
    });

    document.addEventListener("click", jump);

    function startGame(difficulty) {
      // Adjust based on difficulty
      if (difficulty === 'easy') pipeGap = 200;
      if (difficulty === 'medium') pipeGap = 150;
      if (difficulty === 'hard') pipeGap = 100;

      menu.style.display = "none";
      game.style.display = "block";
      gameLoop();
      pipeInterval = setInterval(createPipe, 1500);
    }

    function createPipe() {
      const topHeight = Math.floor(Math.random() * 250) + 50;
      const bottomHeight = window.innerHeight - topHeight - pipeGap;

      const topPipe = document.createElement("div");
      const bottomPipe = document.createElement("div");

      topPipe.className = "pipe pipe-top";
      bottomPipe.className = "pipe pipe-bottom";

      topPipe.style.height = topHeight + "px";
      topPipe.style.top = "0";
      topPipe.style.left = "100vw";

      bottomPipe.style.height = bottomHeight + "px";
      bottomPipe.style.top = (topHeight + pipeGap) + "px";
      bottomPipe.style.left = "100vw";

      game.appendChild(topPipe);
      game.appendChild(bottomPipe);

      pipes.push({ top: topPipe, bottom: bottomPipe, x: window.innerWidth, passed: false });
    }

    function updatePipes() {
      pipes.forEach((pipe, i) => {
        pipe.x -= 2;
        pipe.top.style.left = pipe.x + "px";
        pipe.bottom.style.left = pipe.x + "px";

        // Collision detection
        const birdRect = bird.getBoundingClientRect();
        const topRect = pipe.top.getBoundingClientRect();
        const bottomRect = pipe.bottom.getBoundingClientRect();

        if (
          birdRect.right > topRect.left &&
          birdRect.left < topRect.right &&
          (birdRect.top < topRect.bottom || birdRect.bottom > bottomRect.top)
        ) {
          endGame();
        }

        if (!pipe.passed && pipe.x + 70 < 100) {
          score++;
          pipe.passed = true;
          scoreDisplay.textContent = score;
        }

        if (pipe.x + 70 < 0) {
          pipe.top.remove();
          pipe.bottom.remove();
          pipes.splice(i, 1);
        }
      });
    }

    function endGame() {
      isGameOver = true;
      clearInterval(pipeInterval);
      alert("Game Over! Your score: " + score);
      location.reload();
    }

    function gameLoop() {
      if (isGameOver) return;

      velocity += gravity;
      birdY += velocity;
      bird.style.top = birdY + "px";

      if (birdY < 0 || birdY + 50 > window.innerHeight) {
        endGame();
      }

      updatePipes();
      requestAnimationFrame(gameLoop);
    }