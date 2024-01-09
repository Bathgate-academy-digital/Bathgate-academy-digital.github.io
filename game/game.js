const playerImage = new Image();
playerImage.src = "assets/images/robot.png";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const tileWidth = 80;
const tilesX = 9;
const tilesY = 9;

canvas.width = tileWidth * tilesX;
canvas.height = tileWidth * tilesY;

let recordedSequence = [];
let playerX = 1;
let playerY = 1;

const tileImages = [];
const tileMap = [];
const grassIndex = 1;

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

function initGame() {
  document.addEventListener('keydown', recordKeyPress);

  const mazeLayout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

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
      showComplete();
      resetMaze();
      return;
    }
    if (i > recordedSequence.length) {
      showFailed();
      resetMaze();
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
  const isNotWall = tileMap[newY][newX] !== grassIndex;
  if (isWithinBounds && isNotWall) {
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

playerImage.onload = initGame;
