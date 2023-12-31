const playerImage = new Image();
playerImage.src = "assets/robot.png";
const endGoalImage = new Image();
endGoalImage.src = "Media/end_goal.png";

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
let invalidMoveCounter = 0;
const endPosition = { x: 7, y: 7 };

const tileImages = [];
const tileMap = [];
const grassIndex = 1;

function loadTileImages() {
  const imageSources = ['Media/bad_grass.png', 'Media/grass.png'];
  imageSources.push("Media/end_goal.png");
  
  imageSources.forEach((source, index) => {
    let img = new Image();
    img.src = source;
    img.onload = () => {
      tileImages[index] = img;
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
      if (x === endPosition.x && y === endPosition.y) {
        ctx.drawImage(endGoalImage, x * tileWidth, y * tileWidth, tileWidth, tileWidth);
      } else {
        let tileImage = tileImages[tileIndex];
        ctx.drawImage(tileImage, x * tileWidth, y * tileWidth, tileWidth, tileWidth);
      }
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
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
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
}

function moveUp() {
  recordedSequence.push('arrowup');
}

function moveDown() {
  recordedSequence.push('arrowdown');
}

function moveRight() {
  recordedSequence.push('arrowright');
}

function recordKeyPress(event) {
  const key = event.key.toLowerCase();
  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
    recordedSequence.push(key);
  }
}

function movePlayer() {
  document.removeEventListener('keydown', recordKeyPress);

  let i = 0;
  const intervalId = setInterval(() => {
    if (i < recordedSequence.length) {
      const validMove = updatePlayerPosition(recordedSequence[i]);
      if (!validMove) {
        invalidMoveCounter++;
        console.log(`Invalid moves: ${invalidMoveCounter}`);
      }
      i++;
    } else {
      clearInterval(intervalId);
    }
  }, 500);
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
  
  if (newX >= 0 && newY >= 0 && newX < tilesX && newY < tilesY && tileMap[newY][newX] !== grassIndex) {
    playerX = newX;
    playerY = newY;
    updateCanvas();
  }

  if (playerX === endPosition.x && playerY === endPosition.y) {
    console.log('Maze completed!');
    return true;
  }
  
  return false;
}

playerImage.onload = initGame;
