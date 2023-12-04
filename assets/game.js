const tilesX = 10;
const tilesY = 10;

Stage(function(stage) {
  stage.viewbox(tilesX, tilesX);

  // Create an image and append it to stage
  var robot = Stage.image('robot:idle').appendTo(stage);

  // Set scale and position
  robot.scale(-1 / 512, 1 / 512);
  robot.offset(playerX, playerY)

  robot.tick(function() {
    robot.tween(duration = 50).offset(playerX, playerY)
  });
});

let playerX = 0;
let playerY = 3;

document.onkeydown = (event) => {
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

Stage({
  name: 'robot',
  image: {
    src: 'assets/robot.png',
    ration: 1
  },
  textures: {
    idle: { x: 0, y: 0, width: 512, height: 512 }
  }
});
