let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let startX = 100;
let spacing = 40;
let startY = 100;
let row1 = new InvadersRow();
let row2 = new InvadersRow();
let row3 = new InvadersRow();
let row4 = new InvadersRow();
let row5 = new InvadersRow();

window.onload = function () {
  canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = 600;
  canvas.height = 600;

  for (let i = 0; i < 11; i++) {
    row1.add(new Invader(ctx, startX + spacing * i, startY, "cyan"));
    row2.add(new Invader(ctx, startX + spacing * i, startY + spacing, "purple"));
    row3.add(new Invader(ctx, startX + spacing * i, startY + spacing * 2, "purple"));
    row4.add(new Invader(ctx, startX + spacing * i, startY + spacing * 3, "blue"));
    row5.add(new Invader(ctx, startX + spacing * i, startY + spacing * 4, "blue"));
  }

  row1.draw();
  row2.draw();
  row3.draw();
  row4.draw();
  row5.draw();
  window.requestAnimationFrame(animate);
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  row1.move();
  row2.move();
  row3.move();
  row4.move();
  row5.move();
  row1.draw();
  row2.draw();
  row3.draw();
  row4.draw();
  row5.draw();

  requestAnimationFrame(this.animate.bind(this));
}
