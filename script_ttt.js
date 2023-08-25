const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const newGameBtn = document.querySelector('.new-game-btn');
    const playerXScoreElement = document.querySelector('.player-x-score');
    const playerOScoreElement = document.querySelector('.player-o-score');
    let currentPlayer = 'x';
    let gameActive = true;
    let playerXScore = 0;
    let playerOScore = 0;
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });

    newGameBtn.addEventListener('click', startNewGame);
  
    function handleCellClick(event) {
      const clickedCell = event.target;
      const clickedCellIndex = Array.from(cells).indexOf(clickedCell);
  
      if (gameActive && !clickedCell.textContent) {
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer);
        checkResult();
        togglePlayer();
      }
    }
  
    function togglePlayer() {
      currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
  
    function checkResult() {
      const cellValues = Array.from(cells).map(cell => cell.textContent);
  
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
  
        if (
          cellValues[a] &&
          cellValues[a] === cellValues[b] &&
          cellValues[a] === cellValues[c]
        ) {
          gameActive = false;
          highlightWinningCells(winningCombinations[i]);
          displayMessage(`Player ${currentPlayer.toUpperCase()} wins!`);
          updateScore();
          showNewGameButton();
          break;
        } else if (!cellValues.includes('')) {
          gameActive = false;
          displayMessage("It's a draw!");
          showNewGameButton();
          break;
        }
      }
    }
  
    function highlightWinningCells(winningCombination) {
      winningCombination.forEach(index => {
        cells[index].classList.add('highlight');
      });
    }

    function displayMessage(msg) {
        message.textContent = msg;
    }

    function showNewGameButton() {
        newGameBtn.style.display = 'block';
      }

    function startNewGame() {
        cells.forEach(cell => {
          cell.textContent = '';
          cell.classList.remove('x', 'o', 'highlight');
        });
        message.textContent = '';
        gameActive = true;
        currentPlayer = 'x';
        newGameBtn.style.display = 'none';
      }

      function updateScore() {
        if (currentPlayer === 'x') {
          playerXScore++;
          playerXScoreElement.textContent = playerXScore;
        } else if (currentPlayer === 'o') {
          playerOScore++;
          playerOScoreElement.textContent = playerOScore;
        }
      }