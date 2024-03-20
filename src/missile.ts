class Missile {
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private sprite: Sprite;
  private position: Position;

  constructor(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number) {
    this.ctx = ctx;
    this.image = image;
    this.sprite = new Sprite(new Position(165, 147), 3, 24);
    this.position = new Position(x, y);
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

  move() {
    this.position.y = this.position.y - this.sprite.height / 2;
  }

  collision() {
    if (this.position.y < 100) {
      return true;
    }
    return false;
  }

  explode() {
    this.sprite = new Sprite(new Position(169, 147), 30, 24);
    this.draw();
  }
}
