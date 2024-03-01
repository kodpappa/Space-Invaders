class InvadersRow {
  private direction: number;
  private aliens: Alien[];

  constructor() {
    this.aliens = [];
    this.direction = 1;
  }

  add(alien: Alien) {
    this.aliens.push(alien);
  }

  draw() {
    for (let i = 0; i < this.aliens.length; i++) {
      this.aliens[i].draw();
    }
  }

  move(sidePadding: number) {
    if (this.aliens[0].isOutOfBounds(sidePadding) || this.aliens[10].isOutOfBounds(sidePadding)) {
      this.direction = this.direction * -1;
      this.aliens.forEach((alien) => {
        alien.shiftDown();
      });
    }

    for (let i = 0; i < this.aliens.length; i++) {
      this.aliens[i].move(this.direction);
    }
  }

  wins(bottomPadding: number) {
    if (this.aliens[this.aliens.length - 1].wins(bottomPadding)) {
      return true;
    } else {
      return false;
    }
  }
}
