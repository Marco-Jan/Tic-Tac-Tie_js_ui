



//Input_Section (Abfrage muss noch nachgebracht werden)+übergabe in html+ input dsiplay:none && game dsiplay:block;
function getInputNames_openG() {
  const inputElements = document.querySelectorAll('#inputSection input');
  const inputNames = [];

  inputElements.forEach(input => { //iritiert jedes Element 
    inputNames.push(input.value);
  //   console.log(inputElements); //log
  });

  return inputNames;//übergabe Array('inputNames')
}

const startBtn = document.querySelector('.start_btn');
//click_start_btn
startBtn.addEventListener('click', () => {
  const inputNames = getInputNames_openG();
  const inp_section = document.getElementById('inputSection');
  const playGround = document.getElementById('gameSection');
  console.log(inputNames);  //log

  inp_section.style.display = 'none';
  inp_section.style.transition = 'all 2s linear;'
  playGround.style.display = 'block';


  const displayNames = inputNames.join(' vs ') 
  // console.log(displayNames); //log
  playerDisplay.textContent = displayNames;

  const scoreDisplay = document.getElementById('scoreDisplay');
  scoreDisplay.textContent = '0:1';
  // console.log(scoreDisplay); //log 
});




let currentPlayer = "X"; // Startspieler
let gameActive = true;



function gamemode() {
  const gamefield = document.querySelectorAll('.field');

  gamefield.forEach(field => {
    field.addEventListener('click', () => {
      console.log('Klick');

      if (gameActive && field.innerText === "") { // Überprüfen, ob das Feld leer ist und das Spiel aktiv ist
        field.innerText = currentPlayer;

        if (currentPlayer === "X") {
          field.style.background = '#03f40f';
          field.style.boxShadow = '0 0 5px #03f40f, 0 0 25px #03f40f, 0 0 50px #03f40f, 0 0 200px #03f40f';
          currentPlayer = "O"; // Wechsel zu Spieler "O"
          console.log(currentPlayer);
        } else {
          field.style.background = '#ff7b00';
          field.style.boxShadow = '0 0 5px #ff7b00, 0 0 25px #ff7b00, 0 0 50px #ff7b00, 0 0 200px #ff7b00';
          currentPlayer = "X"; // Wechsel zu Spieler "X"
          console.log(currentPlayer);
        }

        if (checkWin()) {
          alert( currentPlayer +' hat Gewonnen!'); // Gewinnabfrage
          gameActive = false; // Spielstatus auf beendet setzen

          // Klick-Ereignislistener von den Feldern entfernen
          gamefield.forEach(field => {
            field.removeEventListener('click', () => {});
          });
        }

        
      }
    });
  });
}
const gamefield = document.querySelectorAll('.field');
function checkWin() {
 

  // Gewinnkombinationen
  const winningCombinations = [
    [0, 1, 2], // erste Reihe
    [3, 4, 5], // zweite Reihe
    [6, 7, 8], // dritte Reihe
    [0, 3, 6], // erste Spalte
    [1, 4, 7], // zweite Spalte
    [2, 5, 8], // dritte Spalte
    [0, 4, 8], // diagonale gewinnkombination von oben links nach unten rechts
    [2, 4, 6]  // diagonal gewinnkombination von oben rechts nach unten links
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    const fieldA = gamefield[a].innerText;
    const fieldB = gamefield[b].innerText;
    const fieldC = gamefield[c].innerText;

    if (fieldA && fieldA === fieldB && fieldA === fieldC) {
      return true; // Gewinnkombination gefunden
    }
  }

  return false; // keine Gewinnkombination gefunden
}

//Gamereset
//   function resetGame() {
//     const gamefield = document.querySelectorAll('.field');

//     gamefield.forEach(field => {
//         field.innerText = "";
//         field.style.background = '#fff';
//         field.style.boxShadow = 'none'; 
//     });
//   }

//   const reset_btn = document.querySelector('.reset_btn');

//   reset_btn.addEventListener('click', () => {
//     resetGame();
//     gameActive = true;
//     });

gamemode();
























// console.log(currentPlayer);
// const player1 = greatPlayer("X");
// const Player2 = greatPlayer("O");



// function greatPlayer(player,fieldElement){
//     fieldElement.addEventListener('click', () => {
//     return{
//         X_O(){return 'Player X'}
//     }
// })};





// function createGameField(fieldElement) {
//     let currentPlayer = "X";
//     let isFirstPlayer = true; // true für Spieler 1, false für Spieler 2

//     fieldElement.addEventListener('click', () => {
//       console.log('Klick');

//       if (isFirstPlayer) {
//         fieldElement.innerText = 'X';
//         fieldElement.style.background = '#03f40f';
//         fieldElement.style.boxShadow = '0 0 5px #03f40f, 0 0 25px #03f40f, 0 0 50px #03f40f, 0 0 200px #03f40f';
//         isFirstPlayer = false;
//       } else {
//         fieldElement.innerText = 'O';
//         fieldElement.style.background = '#ff7b00';
//         fieldElement.style.boxShadow = '0 0 5px #ff7b00, 0 0 25px #ff7b00, 0 0 50px #ff7b00, 0 0 200px #ff7b00';
//         isFirstPlayer = true;
//       }
//     });
//   }

//   function gamemode() {
//     const gamefield = document.querySelectorAll('.field');

//     gamefield.forEach(field => {
//       createGameField(field);
//     });
//   }

//   gamemode();












    






// function getName (){
//     console.log(inputName);
// }