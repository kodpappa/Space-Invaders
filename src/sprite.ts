class Sprite {
  offset: Position;
  width: number;
  height: number;

  constructor(offset: Position, width: number, height: number) {
    this.offset = offset;
    this.width = width;
    this.height = height;
  }

  draw(ctx, image, x, y) {
    ctx.drawImage(image, this.offset.x, this.offset.y, this.width, this.height, x, y, this.width, this.height);
  }
}
