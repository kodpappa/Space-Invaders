let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let startX = 100;
let spacing = 40;
let startY = 100;
let rows = new Array<InvadersRow>();
let defender: Defender;
let missile: Missile;
let missileSprite: Sprite;
let frameId: number;
let image: HTMLImageElement;
let FPS = 4;
let direction: Direction;
let chars: Chars;

let BORDER_WIDTH = 3;
let SPACING_WIDTH = 8;
let SPRITE_WIDTH = 46;
let SPRITE_HEIGHT = 22;
let BOTTOM_PADDING = 122;
let SIDE_PADDING = 10;

window.onload = function () {
  canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = 600;
  canvas.height = 700;

  image = new Image();
  image.src = "./assets/spritesheet.png";

  var alien1_1 = spritePositionToImagePosition(0, 0);
  var alien1_2 = spritePositionToImagePosition(1, 0);
  var alien2_1 = spritePositionToImagePosition(0, 1);
  var alien2_2 = spritePositionToImagePosition(1, 1);
  var alien3_1 = spritePositionToImagePosition(0, 2);
  var alien3_2 = spritePositionToImagePosition(1, 2);

  var cycle1 = [alien1_1, alien1_2];
  var cycle2 = [alien2_1, alien2_2];
  var cycle3 = [alien3_1, alien3_2];

  var defenderSprite = new Sprite(new Position(4, 148), SPRITE_WIDTH, SPRITE_HEIGHT);

  rows.push(getRow(image, cycle1, 0));
  rows.push(getRow(image, cycle2, 1));
  rows.push(getRow(image, cycle2, 2));
  rows.push(getRow(image, cycle3, 3));
  rows.push(getRow(image, cycle3, 4));

  chars = new Chars();
  defender = new Defender(ctx, image, defenderSprite, new Position(canvas.width / 2, canvas.height - BOTTOM_PADDING));
  frameId = requestAnimationFrame(animate);
};

document.addEventListener("keydown", (event) => {
  if (event.key == "d" || event.key == "ArrowRight") {
    defender.move(12);
  }
  if (event.key == "a" || event.key == "ArrowLeft") {
    defender.move(-12);
  }
  if (event.key == " ") {
    addMissile();
  }
});

function animate() {
  setTimeout(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    chars.drawScore(ctx, image, 0, 0);
    defender.draw();

    if (missile != null) {
      missile.move();

      if (missile.collision()) {
        missile.explode();
        missile = null;
      } else {
        missile.draw();
      }
    }

    for (let row = 0; row < rows.length; row++) {
      rows[row].move(SIDE_PADDING);

      if (rows[row].wins(BOTTOM_PADDING)) {
        console.log("Invaders wins");
        console.log(frameId);
        cancelAnimationFrame(frameId);
        return;
      }

      rows[row].draw();
    }

    frameId = requestAnimationFrame(animate);
  }, 1000 / FPS);
}

function spritePositionToImagePosition(row: number, col: number) {
  return new Position(
    BORDER_WIDTH + col * (SPACING_WIDTH + SPRITE_WIDTH),
    BORDER_WIDTH + row * (SPACING_WIDTH + SPRITE_HEIGHT)
  );
}

function getRow(image: HTMLImageElement, rowcycle, rowNumber: number) {
  var row = new InvadersRow();
  for (let col = 0; col < 11; col++) {
    row.add(
      new Alien(
        ctx,
        image,
        new Sprite(new Position(rowcycle[0].x, rowcycle[0].y), SPRITE_WIDTH, SPRITE_HEIGHT),
        new Sprite(new Position(rowcycle[1].x, rowcycle[1].y), SPRITE_WIDTH, SPRITE_HEIGHT),
        new Position(startX + spacing * col, startY + spacing * rowNumber)
      )
    );
  }

  return row;
}

function addMissile() {
  if (missile == null) {
    var defenderPosition = defender.getCurrentPosition();
    missile = new Missile(ctx, image, defenderPosition.x + SPRITE_WIDTH / 2, defenderPosition.y - SPRITE_HEIGHT);
  }
}
