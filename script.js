let playButton = document.getElementById("play");
let resultDiv = document.getElementById("result");
let p1NameDiv = document.getElementById("p1Name");
let p2NameDiv = document.getElementById("p2Name");
let p1HealthDiv = document.getElementById("p1Health");
let p2HealthDiv = document.getElementById("p2Health");

const soundP1attack=document.getElementById("p1attack");
const soundP1heal=document.getElementById("p1heal");
const soundP2attack=document.getElementById("p2attack");
const soundP2heal=document.getElementById("p2heal") ;
const soundVictory=document.getElementById("victory");
// console.log(playButton.innerText);

// playButton.onclick=()=>{
//   console.log('clicked');
// }

// playButton.addEventListener('click',()=>{
//   console.log('yoyo');
// })

// playButton.addEventListener('click',function(){
//   console.log('funtin');
// })

// document.addEventListener('keydown',function(e){
//   // console.log('you pressed:', e.key);
//   if(e.key=='q'){
//     // console.log('if den gelen you pressed q');
//     soundP1attack.play()
//   }else{
//     soundVictory.play()
//     // console.log('not q');
//   }
// })

const updateGame=(p1,p2,gameState)=>{
  p1NameDiv.innerText=p1.name;
  p2NameDiv.innerText=p2.name;
  p1HealthDiv.innerText = p1.health;
  p2HealthDiv.innerText = p2.health;

  if(p1.health<=0 || p2.health<=0){
    game.isOver=true;
    gameState=game.isOver;
    resultDiv.innerText=game.declareWinner(game.isOver,p1,p2)
    return gameState
  }

}

  class Player { 
    constructor(name, health, attackDamage) {
      this.name = name;
      this.health = health;
      this.attackDmg = attackDamage;
    }

    strike(player,enemy,attackDmg){
      let damageAmount = Math.ceil(Math.random() * attackDmg);
      enemy.health -= damageAmount;
      updateGame(player, enemy, gameState);

      return `${player.name} attacks ${enemy.name} for ${damageAmount} damage!`
     
    }

    heal(player){
      let hpAmount=Math.ceil(Math.random()*5)
      player.health+=hpAmount;

      updateGame(p1, p2, gameState);

      return `${player.name} heals for ${hpAmount} HP! `
    }

  
 }

 class Game{
  constructor(){
    this.isOver=false;
  }

  declareWinner(isOver,p1,p2){
    let message;

    if(isOver==true && p1.health<=0){
      message=`${p2.name} WINS!`
    }else if(isOver==true && p2.health<=0){
      message = `${p1.name} WINS!`;
    }
    soundVictory.play()
    return message;
  }

  reset(p1,p2){
    p1.health=100;
    p2.health=100;
    this.isOver=false;
    resultDiv.innerText='';
    updateGame(p1,p2)
  }


  play(p1,p2){
    this.reset(p1,p2);

    while (!this.isOver) {
    p1.strike(p1, p2, p1.attackDmg);
    p2.heal(p2);
    p2.strike(p2, p1, p2.attackDmg);
    p1.heal(p1);
    }
     return this.declareWinner(this.isOver, p1, p2);
  }
 }

  let player1 = new Player('Qazi', 100, 15);
  let player2 = new Player('Lance', 100, 15);
  //  prompt('what is P1 name')
  // console.log('hello',player1.health, player2.name);

  let p1=player1
  let p2=player2

  let game=new Game();
  // console.log(game);
  updateGame(p1,p2)

  // console.log(p1.strike(p1,p2,10))
  let gameState = game.isOver;

  // console.log(p2.heal(p2));

play.onclick = () => (result.innerText = game.play(p1, p2));


  // ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
  if (e.key == "q" && p2.health > 0 && game.isOver == false ){
    p1.strike(p1, p2, p1.attackDmg)
    // After striking then play attack sound
    soundP1attack.play();
  }
});

document.addEventListener('keydown', function(e) {
    // if you press a AND the player health is greater than 0 AND isOver is still false then strike()
  if (e.key == "a" && p2.health > 0 ){
   p1.heal(p1)
    // After healing then play heal sound
   soundP1heal.play();
  }
});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {
  // if you press p AND enemy health is greater than 0 AND isOver is still false then stike()
  if (e.key == "p" && p1.health > 0 && game.isOver == false ){
    p2.strike(p2, p1, p2.attackDmg)
    // After striking then play attack sound
    soundP2attack.play();
  }
});

document.addEventListener('keydown', function(e) {
  // if you press l AND the player health is greater than 0 AND isOver is still false then heal()
  if (e.key == "l" && p2.health > 0 ){
    // After healing then play heal sound
   player2.heal(p2)
  soundP2heal.play();
  }
});

  