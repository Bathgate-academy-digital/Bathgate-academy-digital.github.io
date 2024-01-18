const playerImage = new Image();
playerImage.src = "assets/images/robot.png";
let levels;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const tileWidth = 80;
const tilesX = 9;
const tilesY = 9;

canvas.width = tileWidth * tilesX;
canvas.height = tileWidth * tilesY;

let currentLevel = 0;
let recordedSequence = [];
let playerX = 1;
let playerY = 1;

const tileImages = [];
const tileMap = [];
const grassIndex = 1;

let startTime;
let endTime;

function loadTileImages() {
  const imageSources = ['assets/images/bad_grass.png', 'assets/images/grass.png', 'assets/images/end_goal.png'];

  imageSources.forEach((source, index) => {
    let img = new Image();
    img.src = source;
    tileImages[index] = img;
    img.onload = () => {
      if (tileImages.length === imageSources.length) {
        updateCanvas();
      }
    };
  });
}

function drawTiles() {
  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      let tileIndex = tileMap[y][x];
      let tileImage = tileImages[tileIndex];
      ctx.drawImage(tileImage, x * tileWidth, y * tileWidth, tileWidth, tileWidth);
    }
  }
}

async function initGame() {
  document.addEventListener('keydown', recordKeyPress);

  const response = await fetch('./levels.json');
  levels = await response.json();
  startTimer();
  loadLevel(currentLevel);
}

function loadLevel(levelNumber) {
  const level = levels[levelNumber];

  playerX = level.start_position[0];
  playerY = level.start_position[1];

  const mazeLayout = level.layout;
  for (let y = 0; y < tilesY; y++) {
    tileMap[y] = [];
    for (let x = 0; x < tilesX; x++) {
      tileMap[y][x] = mazeLayout[y][x];
    }
  }

  loadTileImages();
}
function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTiles();
  drawPlayer(playerX, playerY);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer(x, y) {
  ctx.drawImage(playerImage, x * tileWidth, y * tileWidth, tileWidth, tileWidth);
}

function moveLeft() {
  recordedSequence.push('arrowleft');
  displayArrow('-90deg');
}

function moveUp() {
  recordedSequence.push('arrowup');
  displayArrow('0deg');
}

function moveDown() {
  recordedSequence.push('arrowdown');
  displayArrow('180deg');
}

function moveRight() {
  recordedSequence.push('arrowright');
  displayArrow('90deg');
}

function displayArrow(direction) {
  const movesPreview = document.getElementById('moves-preview');

  const arrow = document.createElement('img');
  arrow.src = 'assets/images/arrow.svg';
  arrow.style.rotate = direction;
  movesPreview.appendChild(arrow);
}

function startTimer() {
  startTime = new Date();
}

function stopTimer() {
  endTime = new Date();
  return Math.floor((endTime - startTime) / 1000);
}


function addPenalty() {
  const currentTime = new Date();
  let elapsedTime = Math.floor((currentTime - startTime) / 1000);
  elapsedTime += 5;
  startTime = new Date(currentTime - elapsedTime * 1000);
}

function recordKeyPress(event) {
  const key = event.key.toLowerCase();
  switch (key) {
    case 'arrowup': moveUp(); break;
    case 'arrowdown': moveDown(); break;
    case 'arrowleft': moveLeft(); break;
    case 'arrowright': moveRight(); break;
  }
}

function movePlayer() {
  document.removeEventListener('keydown', recordKeyPress);

  let i = 0;

  const moveToNextSquare = () => {
    if (isComplete()) {
      if (currentLevel == levels.length - 1) {
        gameComplete();
      } else {
        showComplete();
      }
      return;
    }
    if (i > recordedSequence.length) {
      showFailed();
      return;
    }
    updatePlayerPosition(recordedSequence[i]);
    i++;
    setTimeout(moveToNextSquare, 500);
  };
  moveToNextSquare();
}

function updatePlayerPosition(direction) {
  let newX = playerX;
  let newY = playerY;

  switch (direction) {
    case 'arrowup': newY--; break;
    case 'arrowdown': newY++; break;
    case 'arrowleft': newX--; break;
    case 'arrowright': newX++; break;
  }

  const isWithinBounds = newX >= 0 && newY >= 0 && newX < tilesX && newY < tilesY;
  const isWall = isWithinBounds && tileMap[newY][newX] === grassIndex;

  if (!isWithinBounds || isWall) {
    addPenalty();
  }

  if (isWithinBounds && !isWall) {
    playerX = newX;
    playerY = newY;
    updateCanvas();
  }
}

function isComplete() {
  let tileIndex = tileMap[playerY][playerX];
  if (tileIndex === 2) {
    return true;
  }
}

function resetMaze() {
  recordedSequence = [];
  document.addEventListener('keydown', recordKeyPress);
  document.getElementById('moves-preview').replaceChildren();
}

function nextLevel() {
  currentLevel++;
  resetMaze();
  loadLevel(currentLevel);
  hideModal();
}

function resetLevel() {
  resetMaze();
  loadLevel(currentLevel);
  hideModal();
}

async function gameComplete() {
  const time = stopTimer();
  const id = localStorage.getItem('id');
  const responseFuture = updateTime(id, time);
  showGameEnd();
  const response = await responseFuture;
  if (response.success !== true) {
    alert('Error uploading results')
  }
}


playerImage.onload = initGame;
