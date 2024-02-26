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
    rowcycle;
    radius;
    image;
    currentImage;
    constructor(ctx, image, rowcycle, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.rowcycle = rowcycle;
        this.currentImage = 0;
        this.radius = 12;
        this.image = image;
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
        var x;
        var y;
        if (this.currentImage % 2 === 0) {
            x = this.rowcycle[0].x;
            y = this.rowcycle[0].y;
        }
        else {
            x = this.rowcycle[1].x;
            y = this.rowcycle[1].y;
        }
        this.ctx.drawImage(this.image, x, y, SPRITE_WIDTH, SPRITE_HEIGHT, this.x, this.y, SPRITE_WIDTH, SPRITE_HEIGHT);
        this.currentImage = this.currentImage + 1;
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
let BORDER_WIDTH = 4;
let SPACING_WIDTH = 8;
let SPRITE_WIDTH = 46;
let SPRITE_HEIGHT = 22;
window.onload = function () {
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 800;
    var image = new Image();
    image.src = "./assets/spritesheet.png";
    // extract all of our frames
    var alien1_1 = spritePositionToImagePosition(0, 0);
    var alien1_2 = spritePositionToImagePosition(1, 0);
    var alien2_1 = spritePositionToImagePosition(0, 1);
    var alien2_2 = spritePositionToImagePosition(1, 1);
    var alien3_1 = spritePositionToImagePosition(0, 2);
    var alien3_2 = spritePositionToImagePosition(1, 2);
    var cycle1 = [alien1_1, alien1_2];
    var cycle2 = [alien2_1, alien2_2];
    var cycle3 = [alien3_1, alien3_2];
    rows.push(getRow(image, cycle1, 0));
    rows.push(getRow(image, cycle2, 1));
    rows.push(getRow(image, cycle2, 2));
    rows.push(getRow(image, cycle3, 3));
    rows.push(getRow(image, cycle3, 4));
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
function spritePositionToImagePosition(row, col) {
    return {
        x: BORDER_WIDTH + col * (SPACING_WIDTH + SPRITE_WIDTH),
        y: BORDER_WIDTH + row * (SPACING_WIDTH + SPRITE_HEIGHT),
    };
}
function getRow(image, rowcycle, rowNumber) {
    var row = new InvadersRow();
    for (let col = 0; col < 11; col++) {
        row.add(new Invader(ctx, image, rowcycle, startX + spacing * col, startY + spacing * rowNumber));
    }
    return row;
}
