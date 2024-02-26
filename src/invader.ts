class Invader {
  private x: number;
  private y: number;
  private ctx: CanvasRenderingContext2D;
  private rowcycle: any;
  private radius: number;
  private image: HTMLImageElement;
  private currentImage: number;

  constructor(ctx: CanvasRenderingContext2D, image: HTMLImageElement, rowcycle: any, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.rowcycle = rowcycle;
    this.currentImage = 0;
    this.radius = 12;
    this.image = image;
  }

  move = function (direction: Direction) {
    if (direction === Direction.Left) {
      this.x -= this.radius / 2;
    } else {
      this.x += this.radius / 2;
    }
  };

  draw() {
    var x: number;
    var y: number;

    if (this.currentImage % 2 === 0) {
      x = this.rowcycle[0].x;
      y = this.rowcycle[0].y;
    } else {
      x = this.rowcycle[1].x;
      y = this.rowcycle[1].y;
    }
    this.ctx.drawImage(this.image, x, y, SPRITE_WIDTH, SPRITE_HEIGHT, this.x, this.y, SPRITE_WIDTH, SPRITE_HEIGHT);
    this.currentImage = this.currentImage + 1;
  }

  isOutOfBounds() {
    if (this.x - this.radius <= 0 || this.x + this.radius >= this.ctx.canvas.width) {
      return true;
    } else {
      return false;
    }
  }

  wins() {
    if (this.y + this.radius >= this.ctx.canvas.height) {
      return true;
    } else {
      return false;
    }
  }

  shiftDown() {
    this.y += 25;
  }
}
