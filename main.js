function getInputNames() {
    const inputElements = document.querySelectorAll('#inputSection input');
    const inputNames = [];

    inputElements.forEach(input => {
        inputNames.push(input.value);
    });

    return inputNames;
}

const newGameBtn = document.getElementById('newGame_btn');
newGameBtn.addEventListener('click', newGame);

function newGame() {
    console.log('New game clicked');//log
    const inputSection = document.getElementById('inputSection');
    const gameSection = document.getElementById('gameSection');
    const playerDisplay = document.getElementById('playerDisplay');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const gamefield = document.querySelectorAll('.field');

    // Zeige den Eingabebereich an und verstecke den Spielbereich
    resetGame();
    inputSection.style.display = 'flex';
    inputSection.style.transition = 'all 2s linear;';
    gameSection.style.display = 'none';

    // Löschz die Spielerdaten und das Anzeigefeld
    players.length = 0;
    playerDisplay.textContent = '';
    scoreDisplay.textContent = '';

    // Setzt das Spielfeld zurück
    gamefield.forEach(field => {
        field.innerText = '';
        field.style.background = '';
        field.style.boxShadow = '';
    });

    
}

const startBtn = document.querySelector('.start_btn');
startBtn.addEventListener('click', () => {
    console.log('Start button clicked');
    const inputNames = getInputNames();
    const inp_section = document.getElementById('inputSection');
    const playGround = document.getElementById('gameSection');
    let isEmptyName = false;

    // Überprüfe, ob ein Name eingegeben wurde
    for (const name of inputNames) {
        if (name === '') {
            isEmptyName = true;
            break;
        }
    }

    if (isEmptyName) {
        alert('Bitte geben Sie einen Namen für alle Spieler ein.');
        return;
    }

    inp_section.style.display = 'none';
    inp_section.style.transition = 'all 2s linear;';
    playGround.style.display = 'flex';
    playGround.style.flexDirection= 'column';
    playGround.style.justifyContent= 'center';

    const displayNames = inputNames.join(' vs ');
    playerDisplay.textContent = displayNames;

    createPlayers(inputNames, ['X', 'O']);

    let currentPlayer = players[0];
    let gameActive = true;

    gamemode(currentPlayer, gameActive);
});
//objekt Player Factory

const Player = (name, sign) => {
    let won = false;
    return { name, sign, won };
};

const players = [];

function createPlayers(playerNames, playerSign) {
    for (let i in playerNames) {
        players[i] = Player(playerNames[i], playerSign[i]);
        console.log(players); //log
    }
}

function checkWin() {
    const gamefield = document.querySelectorAll('.field');

    const winningCombinations = [
        [0, 1, 2], // erste Reihe
        [3, 4, 5], // zweite Reihe
        [6, 7, 8], // dritte Reihe
        [0, 3, 6], // erste Spalte
        [1, 4, 7], // zweite Spalte
        [2, 5, 8], // dritte Spalte
        [0, 4, 8], // diagonale Gewinnkombination von oben links nach unten rechts
        [2, 4, 6] // diagonale Gewinnkombination von oben rechts nach unten links
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const fieldA = gamefield[a].innerText;
        const fieldB = gamefield[b].innerText;
        const fieldC = gamefield[c].innerText;

        if (fieldA && fieldA === fieldB && fieldA === fieldC) {
            for (const player of players) {
                if (player.sign === fieldA) {
                    player.won = true;
                    updateScore(players.indexOf(player)); // Aktualisiere den Punktestand des Spielers
                    break;
                }
            }
            return true;
        }
    }

    let count = 0;
    for (const field of gamefield) {
        if (field.innerText !== '') {
            count++;
        }
    }

    if (count === 9) {
        alert("Unentschieden!");
        resetGame();
        return true;

    }

    return false;
}

const resetBtn = document.getElementById('reset_Btn');
resetBtn.addEventListener('click', resetGame);

function resetGame() {
    console.log('Reset button clicked'); // Log
    const gamefield = document.querySelectorAll('.field');

    gamefield.forEach(field => {
        field.innerText = '';
        field.style.background = '';
        field.style.boxShadow = '';
    });

    currentPlayer = players[0];
    gameActive = true;
    gamemode(currentPlayer, gameActive); 
}


function gamemode(currentPlayer, gameActive) {
    const gamefield = document.querySelectorAll('.field');

    function clickHandler(event) {
        const field = event.target;
        if (gameActive && field.innerText === '') {
            field.innerText = currentPlayer.sign;

            if (currentPlayer === players[0]) {
                field.style.background = '#03f40f';
                field.style.boxShadow = '0 0 5px #03f40f, 0 0 25px #03f40f, 0 0 50px #03f40f, 0 0 200px #03f40f';
            } else {
                field.style.background = '#ff7b00';
                field.style.boxShadow = '0 0 5px #ff7b00, 0 0 25px #ff7b00, 0 0 50px #ff7b00, 0 0 200px #ff7b00';
            }

            if (checkWin()) {
                currentPlayer.won = true;
                gameActive = false;

                setTimeout(() => {
                    if (currentPlayer.won) {
                        alert(`Gewonnen: ${currentPlayer.name}!`);
                    } else {
                        alert("Unentschieden!");
                    }
                    resetGame();
                    gamefield.forEach(field => {
                        field.removeEventListener('click', clickHandler);
                    });
                }, 0);
            } else {
                currentPlayer = currentPlayer === players[0] ? players[1] : players[0]; 
            }
        }
    }

    gamefield.forEach(field => {
        field.addEventListener('click', clickHandler);
    });
}

// Initialisierung der Punktzahl
const score = [0, 0]; 

function updateScore(playerIndex) {
    score[playerIndex]++; 
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.textContent = score.join(':'); 
}


