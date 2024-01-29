let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let startX = 50;
let spacing = 35;
let startY = 50;
let row1 = new InvadersRow(1);
let row2 = new InvadersRow(-1);
let row3 = new InvadersRow(1);
let row4 = new InvadersRow(-1);
let row5 = new InvadersRow(1);

window.onload = function () {
  canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < 10; i++) {
    var invader = new Invader(ctx, startX + spacing * i, startY, "cyan");
    row1.add(invader);
    var invader2 = new Invader(ctx, startX + spacing * i, startY + spacing, "purple");
    row2.add(invader2);
  }

  row1.draw();
  row2.draw();
  console.log("HEJEH");
  window.requestAnimationFrame(animate);
};

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  row1.move();
  row2.move();
  row1.draw();
  row2.draw();

  requestAnimationFrame(this.animate.bind(this));
}
