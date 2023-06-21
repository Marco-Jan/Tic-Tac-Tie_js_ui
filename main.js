'use strict'


const playerinit = (() => {
    // Speicherung der Eingabefelder
    const playerNames = [];

    document.getElementById('start').onclick = function () {
        const player1Name = document.getElementById("player1").value;
        const player2Name = document.getElementById("player2").value;
        playerNames.push(player1Name, player2Name);

        console.log(playerNames, 'Hallo');
        
    };

    const playerfigure = ['x','o'];
})();
/* 
function playgame (){
    
} */
