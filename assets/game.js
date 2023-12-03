const tilesX = 10;
const tilesY = 10;
const tileWidth = 20;


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = tileWidth * tilesX;
canvas.height = tileWidth * tilesY;

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

let playerX = 0;
let playerY = 4;

document.getElementsByTagName('body')[0].onkeydown = (event) => {
  switch (event.key) {
    case 'ArrowUp':
      playerY--;
      break;
    case 'ArrowDown':
      playerY++;
      break;
    case 'ArrowLeft':
      playerX--;
      break;
    case 'ArrowRight':
      playerX++;
      break;
  }
  playerX = Math.max(0, Math.min(playerX, tilesX - 1));
  playerY = Math.max(0, Math.min(playerY, tilesY - 1));
};

ctx.strokeStyle = 'White';
ctx.fillStyle = '#98ff98';
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawPlayer(playerX, playerY);

  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}, 20)

