class Defender {
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
    draw() {
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x - this.radius, this.y - this.radius, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
    move(direction) {
        let currentX = this.x;
        this.x += direction;
        if (this.isOutOfBounds()) {
            this.x = currentX;
        }
    }
    isOutOfBounds() {
        if (this.x - this.radius <= 0 || this.x + this.radius >= this.ctx.canvas.width) {
            return true;
        }
        else {
            return false;
        }
    }
}
var Direction;
(function (Direction) {
    Direction[Direction["Left"] = 1] = "Left";
    Direction[Direction["Right"] = 2] = "Right";
})(Direction || (Direction = {}));
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
        if (direction === Direction.Left) {
            this.x -= this.radius / 2;
        }
        else {
            this.x += this.radius / 2;
        }
    };
    draw() {
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
    isOutOfBounds() {
        if (this.x - this.radius <= 0 || this.x + this.radius >= this.ctx.canvas.width) {
            return true;
        }
        else {
            return false;
        }
    }
    wins() {
        if (this.y + this.radius >= this.ctx.canvas.height) {
            return true;
        }
        else {
            return false;
        }
    }
    shiftDown() {
        this.y += 25;
    }
}
class InvadersRow {
    direction;
    invaders;
    constructor() {
        this.invaders = [];
        this.direction = 1;
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
    wins() {
        if (this.invaders[this.invaders.length - 1].wins()) {
            return true;
        }
        else {
            return false;
        }
    }
}
let canvas;
let ctx;
let startX = 100;
let spacing = 40;
let startY = 100;
let rows = new Array();
let defender;
let frameId;
let FPS = 5;
let direction;
window.onload = function () {
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 300;
    for (let row = 0; row < 5; row++) {
        let invadersRow = new InvadersRow();
        for (let col = 0; col < 11; col++) {
            invadersRow.add(new Invader(ctx, startX + spacing * col, startY + spacing * row, "yellow"));
        }
        rows.push(invadersRow);
    }
    defender = new Defender(ctx, canvas.width / 2, canvas.height, "white");
    frameId = requestAnimationFrame(animate);
};
document.addEventListener("keydown", (event) => {
    if (event.key == "d") {
        defender.move(12);
    }
    if (event.key == "a") {
        defender.move(-12);
    }
});
function animate() {
    setTimeout(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        defender.draw();
        for (let row = 0; row < rows.length; row++) {
            rows[row].move();
            if (rows[row].wins()) {
                console.log("Invaders wins");
                console.log(frameId);
                cancelAnimationFrame(frameId);
                return;
            }
            rows[row].draw();
        }
        frameId = requestAnimationFrame(animate);
    }, 1000 / FPS);
}
