function loadTexture(path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      resolve(img);
    };
  });
}

window.onload = async () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const heroImg = await loadTexture("assets/player.png");
  const enemyImg = await loadTexture("assets/enemyShip.png");
  const pattern = ctx.createPattern(
    await loadTexture("assets/starBackground.png"),
    "repeat"
  );
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    heroImg,
    canvas.width / 2 - 50,
    canvas.height - canvas.height / 4,
    100,
    100
  );
  ctx.drawImage(
    heroImg,
    canvas.width / 2 - 50 - 45,
    canvas.height - canvas.height / 4 + 30,
    30,
    30
  );
  ctx.drawImage(
    heroImg,
    canvas.width / 2 + 50 + 15,
    canvas.height - canvas.height / 4 + 30,
    30,
    30
  );

  createEnemies2(ctx, canvas, enemyImg, 6);
};

function createEnemies(ctx, canvas, enemyImg) {
  const MONSTER_TOTAL = 5;
  const MONSTER_WIDTH = MONSTER_TOTAL * enemyImg.width;
  const START_X = (canvas.width - MONSTER_WIDTH) / 2;
  const STOP_X = START_X + MONSTER_WIDTH;

  for (let x = START_X; x < STOP_X; x += enemyImg.width) {
    for (let y = 0; y < enemyImg.height * 5; y += enemyImg.height) {
      ctx.drawImage(enemyImg, x, y);
    }
  }
}

function createEnemies2(ctx, canvas, enemyImg, stage) {
  const MONSTER_HEIGHT = enemyImg.height;
  const MONSTER_WIDTH = enemyImg.width;

  for (let row = 0; row < stage; row++) {
    const MONSTER_TOTAL = stage - row;
    const START_X = (canvas.width - MONSTER_TOTAL * MONSTER_WIDTH) / 2;

    for (let col = 0; col < MONSTER_TOTAL; col++) {
      const x = START_X + col * MONSTER_WIDTH;
      const y = row * MONSTER_HEIGHT;
      ctx.drawImage(enemyImg, x, y);
    }
  }
}
