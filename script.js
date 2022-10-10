let gameBox = document.body
let gameStart = document.querySelector(".gameStart")
let scoreCount = document.querySelector(".scoreBoard")
let playerScore = 0
let playerLifeContainer = document.querySelector(".playerLivesContainer")
let playerLifeBar = document.querySelectorAll(".playerLives")
let gameOver = document.querySelector(".gameOver")
let gameOverDisplay = document.querySelector(".gameOverDisplay")
let gameRestart = document.querySelector(".gameRestart")
let highScore = document.querySelector(".yourScore")
let playerStart = 50
let playerMove = 0
let globalGravity = 1;
gameOver.style.display = "none";
let active = false;

gameStart.addEventListener("click", event => {
  active = true;
rockStart = setInterval(createRocks, 1800);
bombStart = setInterval(createBomb, 1000);
coinStart = setInterval(createCoin, 1900);
treasureStart = setInterval(createTreasure, 2000)
gameStart.style.display = "none";
})

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") {
    movePlayerLeft();
  }
  if (event.key === "ArrowRight") {
    movePlayerRight();
  }
});


function createPlayer(){
  let makePlayer = document.createElement('div');
  makePlayer.classList.add('player');
  makePlayer.setAttribute("id", "player");
  makePlayer.style.bottom = 100 + "px";
  makePlayer.style.left = playerStart + "%";
  gameBox.append(makePlayer);
}
createPlayer();

function movePlayerLeft() {
  if (playerMove > -40) {
    playerMove -= 10
    let player = document.querySelector('#player');
    player.classList.add("lookLeft")
    player.style.left = `calc(${playerStart}% + ${playerMove}%)`
  }
}
function movePlayerRight() {
  if (playerMove < 40) {
    playerMove += 10
    let player = document.querySelector('#player');
    player.classList.remove("lookLeft")
    player.style.left = `calc(${playerStart}% + ${playerMove}%)`
  }
}
function createPlayerLives() {
  for (let i = 0; i < 3; i++) {
    let lives = document.createElement("div");
    lives.classList.add('playerLives')
    lives.getAttribute("id", "lives");
    lives.innerText="❤️"
    playerLifeContainer.append(lives)
  }
}
createPlayerLives();
console.log(playerLifeContainer)

function isCollide(a, b) {
  return !(
    a.y + a.height < b.y ||
    a.y > b.y + b.height ||
    a.x + a.width < b.x ||
    a.x > b.x + b.width
    );
  }
  function createRocks() {
    let makeRocks = document.createElement('div')
    let rockStart = Math.floor(Math.random() * 9) * 10 + 12;
    let rockGravity = 5;
    makeRocks.classList.add('rocks')
    makeRocks.getAttribute("id", "rocks")
    makeRocks.innerText = "🪨"
    makeRocks.style.left = rockStart + "%"
    gameBox.append(makeRocks)
    function fallingRocks() {
      
        rockGravity += globalGravity * 1.4;
        makeRocks.style.top = rockGravity + "px";
        let gameFloor = document.querySelector("#floor").getBoundingClientRect();
        let rocks = makeRocks.getBoundingClientRect();
        let player = document.querySelector('#player').getBoundingClientRect();
        if (isCollide(gameFloor, rocks)) {
          makeRocks.remove()
        }
        if (isCollide(player, rocks)) {
          makeRocks.remove()
          if (active) {
            playerScore -= 10
            scoreCount.textContent = `${playerScore}`
          }
        }
      
    }
    setInterval(fallingRocks, 30);
  }
function createBomb() {
    let makeRocks = document.createElement('div')
    let rockStart = Math.floor(Math.random() * 9) * 10 + 12;
    let rockGravity = 5
    makeRocks.classList.add('bomb')
    makeRocks.getAttribute("id", "bomb")
    makeRocks.style.left = rockStart + "%"
    gameBox.append(makeRocks)
    function fallingRocks() {
      rockGravity += globalGravity * 2;
      makeRocks.style.top = rockGravity + "px"
      let gameFloor = document.querySelector("#floor").getBoundingClientRect();
      let rocks = makeRocks.getBoundingClientRect();
      let player = document.querySelector('#player').getBoundingClientRect();
      if (isCollide(gameFloor,rocks)) {
        makeRocks.remove()
      }
      if (isCollide(player, rocks)) {
        makeRocks.remove()
        playerLifeContainer.removeChild(playerLifeContainer.lastChild)
        console.log(playerLifeContainer.innerHTML.length)
        if (playerLifeContainer.innerHTML.length === 0) {
          console.log("out of lives")
          gameOver.style.opacity = 1
          globalGravity = 0;
          gameOver.style.display = "flex";
          stop();
          active = false;
          scoreCount.textContent = `${playerScore}`
          highScore.textContent = `Your Score: ${playerScore}`

        }
      }
    }
    setInterval(fallingRocks, 30);
  }
  function createCoin() {
    let makeTreasure = document.createElement('div')
    let treasureStart = Math.floor(Math.random() * 9) * 10 + 12;
    let treasureGravity = 5
    makeTreasure.classList.add('coin')
    makeTreasure.getAttribute("id", "coin")
    makeTreasure.style.left = treasureStart + "%"
    gameBox.append(makeTreasure)
    function fallingTreasure() {
      
        treasureGravity += globalGravity * 1.2;
        makeTreasure.style.top = treasureGravity + "px"
        let gameFloor = document.querySelector("#floor").getBoundingClientRect();
        let treasures = makeTreasure.getBoundingClientRect();
        let player = document.querySelector('#player').getBoundingClientRect();
        if (isCollide(gameFloor, treasures)) {
          makeTreasure.remove()
        }
        if (isCollide(player, treasures)) {
          makeTreasure.remove()
          if (active){
            playerScore += 10
            scoreCount.textContent = `${playerScore}`   }      
        }
    }
    setInterval(fallingTreasure, 30);
  }

  function createTreasure() {
    let makeTreasure = document.createElement('div')
    let treasureStart = Math.floor(Math.random() * 9) * 10 + 12;
    let treasureGravity = 5
    makeTreasure.classList.add('treasure')
    makeTreasure.getAttribute("id", "treasure")
    makeTreasure.innerText = "💎"
    makeTreasure.style.left = treasureStart + "%"
    gameBox.append(makeTreasure)
    function fallingTreasure() {
        treasureGravity += globalGravity * 1;
        makeTreasure.style.top = treasureGravity + "px"
        let gameFloor = document.querySelector("#floor").getBoundingClientRect();
        let treasures = makeTreasure.getBoundingClientRect();
        let player = document.querySelector('#player').getBoundingClientRect();
        if (isCollide(gameFloor, treasures)) {
          makeTreasure.remove()
        }
        if (isCollide(player, treasures)) {
          makeTreasure.remove()    
          if (active){
            playerScore += 100
            scoreCount.textContent = `${playerScore}`  }    
        }
      }
    setInterval(fallingTreasure, 30);
  }
  
  gameRestart.addEventListener('click', event => {
    location.reload()
  })

function stop() {
  clearInterval(rockStart);
  clearInterval(bombStart);
  clearInterval(coinStart);
  clearInterval(treasureStart);
};