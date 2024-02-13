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

window.onload = function () {
  canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = 600;
  canvas.height = 300;

  for (let row = 0; row < 5; row++) {
    let invadersRow = new InvadersRow();
    for (let col = 0; col < 11; col++) {
      invadersRow.add(new Invader(ctx, startX + spacing * col, startY + spacing * row, "yellow"));
    }
    rows.push(invadersRow);
  }

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
