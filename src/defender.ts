class Defender {
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private sprite: Sprite;
  private position: Position;

  constructor(ctx: CanvasRenderingContext2D, image: HTMLImageElement, sprite: Sprite, position: Position) {
    this.ctx = ctx;
    this.image = image;
    this.sprite = sprite;
    this.position = position;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.sprite.offset.x,
      this.sprite.offset.y,
      this.sprite.width,
      this.sprite.height,
      this.position.x,
      this.position.y,
      this.sprite.width,
      this.sprite.height
    );
  }

  getCurrentPosition() {
    return this.position;
  }

  move(direction: number) {
    let currentX = this.position.x;
    this.position.x += direction;
    if (this.isOutOfBounds()) {
      this.position.x = currentX;
    }
  }

  isOutOfBounds() {
    if (this.position.x - this.sprite.width <= 0 || this.position.x + this.sprite.width >= this.ctx.canvas.width) {
      return true;
    } else {
      return false;
    }
  }
}
