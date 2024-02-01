class InvadersRow {
  private direction: number;
  private invaders: Invader[];

  constructor() {
    this.invaders = [];
    this.direction = 1;
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
      this.invaders.forEach((invader) => {
        invader.shiftDown();
      });
    }

    for (let i = 0; i < this.invaders.length; i++) {
      this.invaders[i].move(this.direction);
    }
  }
}
