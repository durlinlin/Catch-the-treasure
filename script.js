let gameBox = document.body
let gameStart = document.querySelector(".gameStart")

gameStart.addEventListener("click", event => {
  setInterval(createRocks, 1000);
  setInterval(createTreasure, 1400);
  gameStart.remove()
})

document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") {
    console.log('left');
    movePlayerLeft();
  }
  if (event.key === "ArrowRight") {
    console.log('right');
    movePlayerRight();
  }
});


let playerStart = 50
let playerMove = 0
function createPlayer(){
  let makePlayer = document.createElement('div');
  makePlayer.classList.add('player');
  makePlayer.setAttribute("id", "player");
  makePlayer.style.bottom = 30 + "px";
  makePlayer.style.left = playerStart + "%";
  gameBox.append(makePlayer);
}
createPlayer();

function movePlayerLeft() {
  if (playerMove > -40) {
    playerMove -= 10
    let player = document.querySelector('#player');
    player.style.left = `calc(${playerStart}% + ${playerMove}%)`
  }
}
function movePlayerRight() {
  if (playerMove < 40) {
    playerMove += 10
    let player = document.querySelector('#player');
    player.style.left = `calc(${playerStart}% + ${playerMove}%)`
  }
}

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
    let rockStart = Math.floor(Math.random() * 9) * 10 + 10;
    let rockGravity = 5
    makeRocks.classList.add('rocks')
    makeRocks.getAttribute("id", "rocks")
    makeRocks.style.left = rockStart + "%"
    gameBox.append(makeRocks)
    function fallingRocks() {
      rockGravity += 2
      makeRocks.style.top = rockGravity + "px"
      let gameFloor = document.querySelector("#floor").getBoundingClientRect();
      let rocks = makeRocks.getBoundingClientRect();
      let player = document.querySelector('#player').getBoundingClientRect();
      if (isCollide(gameFloor,rocks)) {
        makeRocks.remove()
      }
      if (isCollide(player, rocks)) {
        makeRocks.remove()
      }
    }
    setInterval(fallingRocks, 30);
  }
  // setInterval(createRocks, 1000);
  
  function createTreasure() {
    let makeTreasure = document.createElement('div')
    let treasureStart = Math.floor(Math.random() * 9) * 10 + 10;
    let treasureGravity = 5
    makeTreasure.classList.add('treasure')
    makeTreasure.getAttribute("id", "treasure")
    makeTreasure.style.left = treasureStart + "%"
    gameBox.append(makeTreasure)
    function fallingTreasure() {
      treasureGravity += 1.5
      makeTreasure.style.top = treasureGravity + "px"
      let gameFloor = document.querySelector("#floor").getBoundingClientRect();
      let treasures = makeTreasure.getBoundingClientRect();
      let player = document.querySelector('#player').getBoundingClientRect();
      if (isCollide(gameFloor,treasures)) {
        makeTreasure.remove()
      }
      if (isCollide(player, treasures)) {
        makeTreasure.remove()
      }
    }
    setInterval(fallingTreasure, 30);
  }
  // setInterval(createTreasure, 1400);
  
