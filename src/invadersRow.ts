class InvadersRow {
  private direction: number;
  private invaders: Invader[];

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
    for (let i = 0; i < this.invaders.length; i++) {
      this.invaders[i].move(this.direction);
    }
  }
}
