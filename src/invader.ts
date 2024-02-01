class Invader {
  private x: number;
  private y: number;
  private ctx: CanvasRenderingContext2D;
  private color: string;
  private radius: number;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 12;
  }

  move = function (direction: number) {
    this.x += direction;
  };

  draw() {
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  isOutOfBounds() {
    if (this.x - this.radius <= 0 || this.x + this.radius >= this.ctx.canvas.width) {
      return true;
    } else {
      return false;
    }
  }

  shiftDown() {
    this.y += 25;
  }
}
