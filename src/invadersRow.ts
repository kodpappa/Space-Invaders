class InvadersRow {
  private direction: number;
  private invaders: Invader[];
  y: number;

  constructor(direction: number) {
    this.invaders = [];
    this.direction = direction;
  }

  add(invader: Invader) {
    this.invaders.push(invader);
  }

  draw() {
    for (let i = 0; i < this.invaders.length; i++) {
      this.invaders[i].draw();
    }
  }

  move() {
    if (this.invaders[0].isOutOfBounds() || this.invaders[10].isOutOfBounds()) {
      this.direction = this.direction * -1;
      this.y += 35;
    }

    for (let i = 0; i < this.invaders.length; i++) {
      this.invaders[i].move(this.direction);
    }
  }
}
