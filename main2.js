'use strict'

 const playground_class = "playground";
 const playerdisplay_class ="playerdisplay";
 const field_class ="field";
 const player1_class ="player1";
 const player2_class ="payer2";
    //übernahme vom html
 const playground = document.querySelector('.' + playground_class);
 const playerdisplay = document.querySelector('.' + playerdisplay_class);

 const field = document.querySelectorAll('.' + field_class);
    //aktuelle klasse
    
 let act_class;

 startGame();

 function Klickverarbieten(e){
    //welches feld wurde geklickt
    const field = e.target;
 }
    //Speilstein auf dieses Feld setzen
 function Spielsteinsetzen (field){
    //überpüfung ob schon gesetz wurde
    if (field.classlist.contains(player1_class) || field.classlist.contains(player2_class)){
        //verhindern das gestzt wird weil schon gesetz wurde
        return false;

    }
    //dem feld die Klasse des Spielers anhängen, der gerade an der Reihe is
    field.classlist.add(act_class);
    // das Feld deaktivieren, um weitere Klicks zu verhindern
    field.disabled = true;

    return true;

    }

    function startGame(){
        //die Liste der felder durchgehen
        for( const field of fields){
            //jedem feld sagen, was beim klick drauf passieren soll
        field.addeventlistener('click',Klickverarbieten);

        }




    }


 



























// const playerinit = (() => {
//     // Speicherung der Eingabefelder
//     const playerNames = [];

//     document.getElementById('start').onclick = function () {
//         const player1Name = document.getElementById("player1").value;
//         const player2Name = document.getElementById("player2").value;
//         playerNames.push(player1Name, player2Name);

//         console.log(playerNames, 'Hallo');
        
//     };

//     const playerfigure = ['x','o'];
// })();



/* 
function playgame (){
    
} */
