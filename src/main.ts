let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let startX = 100;
let spacing = 40;
let startY = 100;
let rows = new Array<InvadersRow>();
let defender: Defender;

window.onload = function () {
  canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = 600;
  canvas.height = 600;

  for (let row = 0; row < 5; row++) {
    let invadersRow = new InvadersRow();
    for (let col = 0; col < 11; col++) {
      invadersRow.add(new Invader(ctx, startX + spacing * col, startY + spacing * row, "yellow"));
    }
    rows.push(invadersRow);
  }

  defender = new Defender(ctx, canvas.width / 2, canvas.height, "white");
  window.requestAnimationFrame(animate);
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < rows.length; row++) {
    rows[row].move();
    rows[row].draw();
  }

  defender.draw();
  requestAnimationFrame(this.animate.bind(this));
}
