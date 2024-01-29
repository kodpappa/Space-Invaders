class Invader {
  private x: number;
  private y: number;
  private ctx: CanvasRenderingContext2D;
  private color: string;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  move = function (direction: number) {
    this.x += direction;
  };

  draw() {
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 12, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
