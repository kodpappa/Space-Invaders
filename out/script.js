class Invader {
    x;
    y;
    ctx;
    color;
    radius;
    constructor(ctx, x, y, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 12;
    }
    move = function (direction) {
        this.x += direction;
    };
    draw() {
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
    hitsEdge() {
        if (this.x - this.radius <= 0 || this.x + this.radius >= this.ctx.canvas.width) {
            console.log(this);
            return true;
        }
        else {
            return false;
        }
    }
}
class InvadersRow {
    direction;
    invaders;
    constructor(direction) {
        this.invaders = [];
        this.direction = direction;
    }
    add(invader) {
        this.invaders.push(invader);
    }
    draw() {
        for (let i = 0; i < this.invaders.length; i++) {
            this.invaders[i].draw();
        }
    }
    move() {
        if (this.invaders[0].hitsEdge() || this.invaders[10].hitsEdge()) {
            this.direction = this.direction * -1;
        }
        for (let i = 0; i < this.invaders.length; i++) {
            this.invaders[i].move(this.direction);
        }
    }
}
let canvas;
let ctx;
let startX = 100;
let spacing = 40;
let startY = 100;
let row1 = new InvadersRow(1);
let row2 = new InvadersRow(1);
let row3 = new InvadersRow(1);
let row4 = new InvadersRow(1);
let row5 = new InvadersRow(1);
window.onload = function () {
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 600;
    for (let i = 0; i < 11; i++) {
        row1.add(new Invader(ctx, startX + spacing * i, startY, "cyan"));
        row2.add(new Invader(ctx, startX + spacing * i, startY + spacing, "purple"));
        row3.add(new Invader(ctx, startX + spacing * i, startY + spacing * 2, "purple"));
        row4.add(new Invader(ctx, startX + spacing * i, startY + spacing * 3, "blue"));
        row5.add(new Invader(ctx, startX + spacing * i, startY + spacing * 4, "blue"));
    }
    row1.draw();
    row2.draw();
    row3.draw();
    row4.draw();
    row5.draw();
    window.requestAnimationFrame(animate);
};
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    row1.move();
    row2.move();
    row3.move();
    row4.move();
    row5.move();
    row1.draw();
    row2.draw();
    row3.draw();
    row4.draw();
    row5.draw();
    requestAnimationFrame(this.animate.bind(this));
}
