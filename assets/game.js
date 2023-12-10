// Constants
const tilesX = 9;
const tilesY = 9;
const tileWidth = 20;

// Variables
let recordedSequence = [];
let playerX = 4;
let playerY = 4;

// Elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Canvas initialisation
canvas.width = tileWidth * tilesX;
canvas.height = tileWidth * tilesY;
ctx.strokeStyle = 'White';
ctx.fillStyle = '#98ff98';
updateCanvas();

// Function definitions

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawPlayer(playerX, playerY);

  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
  for (let x = 0; x < tilesX; x++) {
    for (let y = 0; y < tilesY; y++) {
      ctx.strokeRect(x * tileWidth + 1, y * tileWidth + 1, tileWidth, tileWidth);
    }
  }
}

function drawPlayer(x, y) {
  ctx.fillRect(x * tileWidth, y * tileWidth, tileWidth, tileWidth);
}

function startRecording() {
  recordedSequence.length = 0;
  document.addEventListener('keydown', (event) => recordKeyPress(event, recordedSequence));
}

function recordKeyPress(event, recordedSequence) {
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
      const direction = recordedSequence[i];
      updatePlayerPosition(direction)
      i++;
    } else {
      clearInterval(intervalId);
    }
  }, 500);
}

function updatePlayerPosition(direction) {
  switch (direction) {
    case 'arrowup':
      playerY--;
      break;
    case 'arrowdown':
      playerY++;
      break;
    case 'arrowleft':
      playerX--;
      break;
    case 'arrowright':
      playerX++;
      break;
  }
  playerX = Math.max(0, Math.min(playerX, tilesX - 1));
  playerY = Math.max(0, Math.min(playerY, tilesY - 1));
  updateCanvas();
}
