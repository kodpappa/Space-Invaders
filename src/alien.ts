class Alien {
  private ctx: CanvasRenderingContext2D;
  private image: HTMLImageElement;
  private sprite1: Sprite;
  private sprite2: Sprite;
  private position: Position;
  private currentSprite: Sprite;

  constructor(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    sprite1: Sprite,
    sprite2: Sprite,
    position: Position
  ) {
    this.ctx = ctx;
    this.image = image;
    this.sprite1 = sprite1;
    this.sprite2 = sprite2;
    this.currentSprite = this.sprite1;
    this.position = position;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.currentSprite.offset.x,
      this.currentSprite.offset.y,
      this.currentSprite.width,
      this.currentSprite.height,
      this.position.x,
      this.position.y,
      this.currentSprite.width,
      this.currentSprite.height
    );
    if (this.currentSprite === this.sprite1) {
      this.currentSprite = this.sprite2;
    } else {
      this.currentSprite = this.sprite1;
    }
  }

  move(direction: Direction) {
    if (direction === Direction.Left) {
      this.position.x -= this.currentSprite.width / 5;
    } else {
      this.position.x += this.currentSprite.width / 5;
    }
  }

  isOutOfBounds(sidePadding: number) {
    if (
      this.position.x <= sidePadding ||
      this.position.x + this.currentSprite.width >= this.ctx.canvas.width - sidePadding
    ) {
      return true;
    } else {
      return false;
    }
  }

  wins(bottomPadding: number) {
    if (this.position.y + this.currentSprite.width >= this.ctx.canvas.height - bottomPadding) {
      return true;
    } else {
      return false;
    }
  }

  shiftDown() {
    this.position.y += 25;
  }
}
