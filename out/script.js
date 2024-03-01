class Alien {
    ctx;
    image;
    sprite1;
    sprite2;
    position;
    currentSprite;
    constructor(ctx, image, sprite1, sprite2, position) {
        this.ctx = ctx;
        this.image = image;
        this.sprite1 = sprite1;
        this.sprite2 = sprite2;
        this.currentSprite = this.sprite1;
        this.position = position;
    }
    draw() {
        this.ctx.drawImage(this.image, this.currentSprite.offset.x, this.currentSprite.offset.y, this.currentSprite.width, this.currentSprite.height, this.position.x, this.position.y, this.currentSprite.width, this.currentSprite.height);
        if (this.currentSprite === this.sprite1) {
            this.currentSprite = this.sprite2;
        }
        else {
            this.currentSprite = this.sprite1;
        }
    }
    move(direction) {
        if (direction === Direction.Left) {
            this.position.x -= this.currentSprite.width / 5;
        }
        else {
            this.position.x += this.currentSprite.width / 5;
        }
    }
    isOutOfBounds(sidePadding) {
        if (this.position.x <= sidePadding ||
            this.position.x + this.currentSprite.width >= this.ctx.canvas.width - sidePadding) {
            return true;
        }
        else {
            return false;
        }
    }
    wins(bottomPadding) {
        if (this.position.y + this.currentSprite.width >= this.ctx.canvas.height - bottomPadding) {
            return true;
        }
        else {
            return false;
        }
    }
    shiftDown() {
        this.position.y += 25;
    }
}
class Defender {
    ctx;
    image;
    sprite;
    position;
    constructor(ctx, image, sprite, position) {
        this.ctx = ctx;
        this.image = image;
        this.sprite = sprite;
        this.position = position;
    }
    draw() {
        this.ctx.drawImage(this.image, this.sprite.offset.x, this.sprite.offset.y, this.sprite.width, this.sprite.height, this.position.x, this.position.y, this.sprite.width, this.sprite.height);
    }
    move(direction) {
        let currentX = this.position.x;
        this.position.x += direction;
        if (this.isOutOfBounds()) {
            this.position.x = currentX;
        }
    }
    isOutOfBounds() {
        if (this.position.x - this.sprite.width <= 0 || this.position.x + this.sprite.width >= this.ctx.canvas.width) {
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
// class Invader {
//   private x: number;
//   private y: number;
//   private ctx: CanvasRenderingContext2D;
//   private rowcycle: any;
//   private radius: number;
//   private image: HTMLImageElement;
//   private currentImage: number;
//   constructor(ctx: CanvasRenderingContext2D, image: HTMLImageElement, rowcycle: any, x: number, y: number) {
//     this.ctx = ctx;
//     this.x = x;
//     this.y = y;
//     this.rowcycle = rowcycle;
//     this.currentImage = 0;
//     this.radius = 12;
//     this.image = image;
//   }
//   move = function (direction: Direction) {
//     if (direction === Direction.Left) {
//       this.x -= this.radius / 2;
//     } else {
//       this.x += this.radius / 2;
//     }
//   };
//   draw() {
//     this.ctx.drawImage(
//       this.image,
//       this.rowcycle[this.currentImage % 2].x,
//       this.rowcycle[this.currentImage % 2].y,
//       SPRITE_WIDTH,
//       SPRITE_HEIGHT,
//       this.x,
//       this.y,
//       SPRITE_WIDTH,
//       SPRITE_HEIGHT
//     );
//     this.currentImage = this.currentImage + 1;
//   }
//   isOutOfBounds() {
//     if (this.x - this.radius <= 0 || this.x + this.radius >= this.ctx.canvas.width) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//   wins() {
//     if (this.y + this.radius >= this.ctx.canvas.height) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//   shiftDown() {
//     this.y += 25;
//   }
// }
class InvadersRow {
    direction;
    aliens;
    constructor() {
        this.aliens = [];
        this.direction = 1;
    }
    add(alien) {
        this.aliens.push(alien);
    }
    draw() {
        for (let i = 0; i < this.aliens.length; i++) {
            this.aliens[i].draw();
        }
    }
    move(sidePadding) {
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
    wins(bottomPadding) {
        if (this.aliens[this.aliens.length - 1].wins(bottomPadding)) {
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
let FPS = 10;
let direction;
let BORDER_WIDTH = 4;
let SPACING_WIDTH = 8;
let SPRITE_WIDTH = 46;
let SPRITE_HEIGHT = 22;
let BOTTOM_PADDING = 122;
let SIDE_PADDING = 10;
window.onload = function () {
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 800;
    var image = new Image();
    image.src = "./assets/spritesheet.png";
    var alien1_1 = spritePositionToImagePosition(0, 0);
    var alien1_2 = spritePositionToImagePosition(1, 0);
    var alien2_1 = spritePositionToImagePosition(0, 1);
    var alien2_2 = spritePositionToImagePosition(1, 1);
    var alien3_1 = spritePositionToImagePosition(0, 2);
    var alien3_2 = spritePositionToImagePosition(1, 2);
    var cycle1 = [alien1_1, alien1_2];
    var cycle2 = [alien2_1, alien2_2];
    var cycle3 = [alien3_1, alien3_2];
    var defenderSprite = new Sprite(new Position(4, 148), SPRITE_WIDTH, SPRITE_HEIGHT);
    rows.push(getRow(image, cycle1, 0));
    rows.push(getRow(image, cycle2, 1));
    rows.push(getRow(image, cycle2, 2));
    rows.push(getRow(image, cycle3, 3));
    rows.push(getRow(image, cycle3, 4));
    defender = new Defender(ctx, image, defenderSprite, new Position(canvas.width / 2, canvas.height - BOTTOM_PADDING));
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
            rows[row].move(SIDE_PADDING);
            if (rows[row].wins(BOTTOM_PADDING)) {
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
    return new Position(BORDER_WIDTH + col * (SPACING_WIDTH + SPRITE_WIDTH), BORDER_WIDTH + row * (SPACING_WIDTH + SPRITE_HEIGHT));
}
function getRow(image, rowcycle, rowNumber) {
    var row = new InvadersRow();
    for (let col = 0; col < 11; col++) {
        row.add(new Alien(ctx, image, new Sprite(new Position(rowcycle[0].x, rowcycle[0].y), SPRITE_WIDTH, SPRITE_HEIGHT), new Sprite(new Position(rowcycle[1].x, rowcycle[1].y), SPRITE_WIDTH, SPRITE_HEIGHT), new Position(startX + spacing * col, startY + spacing * rowNumber)));
    }
    return row;
}
class Position {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Sprite {
    offset;
    width;
    height;
    constructor(offset, width, height) {
        this.offset = offset;
        this.width = width;
        this.height = height;
    }
}
