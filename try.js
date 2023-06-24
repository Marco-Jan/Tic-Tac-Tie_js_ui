const gameModule = (() => {
    let currentPlayer = "X";
    let gameOver = false;
    let moves = 0;
  
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    const playerDisplay = document.getElementById("playerDisplay");
    const scoreDisplay = document.getElementById("scoreDisplay");
    const fields = document.querySelectorAll(".field");
    const resetBtn = document.getElementById("reset_Btn");
    const winnerModal = document.getElementById("winnerModal");
    const winnerText = document.getElementById("winnerText");
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    const startGame = () => {
      const player1Name = player1.value || "Player X";
      const player2Name = player2.value || "Player O";
      playerDisplay.textContent = `${player1Name}'s Turn`;
      currentPlayer = "X";
      gameOver = false;
      moves = 0;
      scoreDisplay.textContent = `${player1Name}: 0 | ${player2Name}: 0`;
      resetBtn.style.display = "none";
      winnerModal.style.display = "none";
  
      fields.forEach((field) => {
        field.textContent = "";
        field.style.backgroundColor = "rgb(255, 255, 255)";
      });
  
      fields.forEach((field) => {
        field.addEventListener("mouseenter", () => {
          if (!gameOver && field.textContent === "") {
            field.style.backgroundColor = currentPlayer === "X" ? "#03e9f4" : "#9c03f4";
          }
        });
  
        field.addEventListener("mouseleave", () => {
          if (!gameOver && field.textContent === "") {
            field.style.backgroundColor = "rgb(255, 255, 255)";
          }
        });
      });
    };
  
    const makeMove = (index) => {
      if (!gameOver && fields[index].textContent === "") {
        fields[index].textContent = currentPlayer;
        fields[index].style.backgroundColor = "rgb(255, 255, 255)";
        moves++;
  
        if (checkWin()) {
          const player1Name = player1.value || "Player X";
          const player2Name = player2.value || "Player O";
          const winner = currentPlayer === "X" ? player1Name : player2Name;
          playerDisplay.textContent = `${winner} Wins!`;
          updateScore(winner);
          gameOver = true;
          resetBtn.style.display = "block";
          openModal(winner);
          return;
        }
  
        if (moves === 9) {
          playerDisplay.textContent = "It's a Tie!";
          gameOver = true;
          resetBtn.style.display = "block";
          openModal("tie");
          return;
        }
  
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        const player1Name = player1.value || "Player X";
        const player2Name = player2.value || "Player O";
        playerDisplay.textContent =
          currentPlayer === "X" ? `${player1Name}'s Turn` : `${player2Name}'s Turn`;
      }
    };
  
    const checkWin = () => {
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (
          fields[a].textContent !== "" &&
          fields[a].textContent === fields[b].textContent &&
          fields[a].textContent === fields[c].textContent
        ) {
          fields[a].style.backgroundColor = "#03e9f4";
          fields[b].style.backgroundColor = "#03e9f4";
          fields[c].style.backgroundColor = "#03e9f4";
          return true;
        }
      }
      return false;
    };
  
    const updateScore = (winner) => {
      const player1Name = player1.value || "Player X";
      const player2Name = player2.value || "Player O";
      const scores = scoreDisplay.textContent.split(" | ");
      let scorePlayer1 = parseInt(scores[0].split(": ")[1]);
      let scorePlayer2 = parseInt(scores[1].split(": ")[1]);
  
      if (winner === player1Name) {
        scorePlayer1++;
      } else if (winner === player2Name) {
        scorePlayer2++;
      }
  
      scoreDisplay.textContent = `${player1Name}: ${scorePlayer1} | ${player2Name}: ${scorePlayer2}`;
    };
  
    const openModal = (winner) => {
      winnerText.textContent = winner === "tie" ? "It's a Tie!" : `${winner} Wins!`;
      winnerModal.style.display = "block";
    };
  
    const closeModal = () => {
      winnerModal.style.display = "none";
    };
  
    resetBtn.addEventListener("click", startGame);
    winnerModal.addEventListener("click", closeModal);
  
    return {
        startGame,
        makeMove,
      };
      
      })();
      
      gameModule.startGame();
  