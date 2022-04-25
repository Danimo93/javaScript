'use strict';
// Får tak i alle html elementr og lagrer i en variabel
let scoreOne = document.getElementById('score--0');
let scoreTwo = document.getElementById('score--1');
let poengsummSpillerEn =  document.getElementById('Poengsumm-0');
let poengsummSpillerTo =  document.getElementById('Poengsumm-1"');
let terning =document.getElementById('terning');
let kastTerning = document.getElementById('kast');
let nyttSpill = document.getElementById('nytt');
let ståOver = document.getElementById('stå');
let SpillerEn = document.querySelector('.player--0 ');
let SpillerTo = document.querySelector('.player--1');



//start verdier og skjuler terning fra starten av spillet 
scoreOne.textContent = 0;
scoreTwo.textContent = 0;
poengsummSpillerEn.textContent = 0;
poengsummSpillerEn.textContent = 0;
terning.classList.add('skjult');  //legger til skjult css på terning i midten.

// Spill variabeler
let TotalSkår = [0,0];
 let Poengsumm = 0;
 let aktivSpiller = 0; 

//  Funksjon: Terningkast og nåværende poengsum, kontroller også aktivspiller 
function terningKaster () {
   
    let nummer = Math.floor(Math.random()*6+1);
    terning.classList.remove('skjult');
     terning.src = `dice-${nummer}.png`

  if(nummer !== 1) {
    Poengsumm+=nummer;
    document.getElementById(`Poengsumm-${aktivSpiller}`).textContent = Poengsumm;
  

  } else {
    byttSpiller()
    
  }
}

  function byttSpiller () {
      // Når en har blitt rullet så resetter den nåværende poengsum før den bytter 
    document.getElementById(`Poengsumm-${aktivSpiller}`).textContent = 0;
    Poengsumm = 0;
      //Ternæroperator if 0 sett til 1 hvis 0 sett til 1
    aktivSpiller =  aktivSpiller === 0? 1: 0;
    //legger til eller fjerner hvit bakgrunn basert på hvem som spiller
    SpillerEn.classList.toggle('player--active');
    SpillerTo.classList.toggle('player--active');

  }


 // Funksjon som legger til nåværende poengsum til totalskår(array) og bytter spiller
 // Sjekker også om spiller har vunnet
function ståOverRunde (){
    TotalSkår[aktivSpiller] += Poengsumm;
    document.getElementById(`score--${aktivSpiller}`).textContent =  TotalSkår[aktivSpiller];

    if(TotalSkår[aktivSpiller] >=50) {
        document.querySelector(`.player--${aktivSpiller}`).classList.add('player--winner');
        document.querySelector(`.player--${aktivSpiller}`).classList.remove('player--active');
        document.getElementById("kast").setAttribute('disabled','disabled');
        document.getElementById("stå").setAttribute('disabled','disabled');
        terning.classList.add('skjult');
    } else {
        byttSpiller();
    }
    


}

function startPåNytt(){
    window.location.reload();
} 

// Events 
kastTerning.onclick = terningKaster;
ståOver.onclick = ståOverRunde;
nyttSpill.onclick = startPåNytt;
