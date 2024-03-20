const CHAR_HEIGHT = 24;
const CHAR_WIDTH = 24;
const CHAR_SPACING = 6;
const CHAR_OFFSET = 207;

class Chars {
  char_h: Sprite;
  char_i: Sprite;
  char_s: Sprite;
  char_c: Sprite;
  char_o: Sprite;
  char_r: Sprite;
  char_e: Sprite;
  char_dash: Sprite;
  char_gt: Sprite;
  char_lt: Sprite;
  char_0: Sprite;
  char_1: Sprite;
  char_2: Sprite;
  char_3: Sprite;
  char_4: Sprite;
  char_5: Sprite;
  char_6: Sprite;
  char_7: Sprite;
  char_8: Sprite;
  char_9: Sprite;

  constructor() {
    this.char_s = new Sprite(getCharSpritePostion(2, 2), CHAR_WIDTH, CHAR_HEIGHT);
    this.char_c = new Sprite(getCharSpritePostion(0, 2), CHAR_WIDTH, CHAR_HEIGHT);
    this.char_o = new Sprite(getCharSpritePostion(1, 6), CHAR_WIDTH, CHAR_HEIGHT);
    this.char_r = new Sprite(getCharSpritePostion(2, 1), CHAR_WIDTH, CHAR_HEIGHT);
    this.char_e = new Sprite(getCharSpritePostion(0, 4), CHAR_WIDTH, CHAR_HEIGHT);
  }

  drawScore(ctx, image, posX, posY) {
    this.char_s.draw(ctx, image, posX, posY);
    this.char_c.draw(ctx, image, CHAR_WIDTH, posY);
    this.char_o.draw(ctx, image, CHAR_WIDTH * 2, posY);
    this.char_r.draw(ctx, image, CHAR_WIDTH * 3, posY);
    this.char_e.draw(ctx, image, CHAR_WIDTH * 4, posY);
  }
}

function getCharSpritePostion(row: number, col: number) {
  return new Position(
    BORDER_WIDTH + col * (CHAR_SPACING + CHAR_WIDTH),
    BORDER_WIDTH + row * (CHAR_SPACING + CHAR_HEIGHT) + 204
  );
}
