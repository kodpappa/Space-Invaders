let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let startX = 100;
let spacing = 40;
let startY = 100;
let rows = new Array<InvadersRow>();
let defender: Defender;
let frameId: number;
let FPS = 5;
let direction: Direction;

let BORDER_WIDTH = 4;
let SPACING_WIDTH = 8;
let SPRITE_WIDTH = 46;
let SPRITE_HEIGHT = 22;

window.onload = function () {
  canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = 600;
  canvas.height = 800;

  var image = new Image();
  image.src = "./assets/spritesheet.png";

  // extract all of our frames
  var alien1_1 = spritePositionToImagePosition(0, 0);
  var alien1_2 = spritePositionToImagePosition(1, 0);
  var alien2_1 = spritePositionToImagePosition(0, 1);
  var alien2_2 = spritePositionToImagePosition(1, 1);
  var alien3_1 = spritePositionToImagePosition(0, 2);
  var alien3_2 = spritePositionToImagePosition(1, 2);

  var cycle1 = [alien1_1, alien1_2];
  var cycle2 = [alien2_1, alien2_2];
  var cycle3 = [alien3_1, alien3_2];

  rows.push(getRow(image, cycle1, 0));
  rows.push(getRow(image, cycle2, 1));
  rows.push(getRow(image, cycle2, 2));
  rows.push(getRow(image, cycle3, 3));
  rows.push(getRow(image, cycle3, 4));

  defender = new Defender(ctx, canvas.width / 2, canvas.height, "white");
  frameId = requestAnimationFrame(animate);
};

document.addEventListener("keydown", (event) => {
  if (event.key == "d") {
    defender.move(12);
  }
  if (event.key == "a") {
    defender.move(-12);
  }
});

function animate() {
  setTimeout(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    defender.draw();

    for (let row = 0; row < rows.length; row++) {
      rows[row].move();

      if (rows[row].wins()) {
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
  return {
    x: BORDER_WIDTH + col * (SPACING_WIDTH + SPRITE_WIDTH),
    y: BORDER_WIDTH + row * (SPACING_WIDTH + SPRITE_HEIGHT),
  };
}

function getRow(image: HTMLImageElement, rowcycle, rowNumber: number) {
  var row = new InvadersRow();
  for (let col = 0; col < 11; col++) {
    row.add(new Invader(ctx, image, rowcycle, startX + spacing * col, startY + spacing * rowNumber));
  }

  return row;
}
