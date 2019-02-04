// Enemies our player must avoid
class Enemy {
    // Enemy constructor
    constructor() {
        // Variables applied to each of our instances go here,
        // We've provided one for you to get started
        this.speedRange = [200, 300, 300, 500, 500];  // The array is used to randomize the enemy's speed
        this.speed = this.speedRange[Math.floor(Math.random() * this.speedRange.length)]; // Asigns the random speed
        this.rangeY = [73, 156, 239]; // Array is used to randomize the row along which the enemy will move
        this.rangeX = [-100, -150, -200, -250, -300, -350]; // Array is used to randomize the delay when enemy reapears on canvas by changing it's initial position 
        this.x = this.rangeX[Math.floor(Math.random() * this.rangeX.length)]; // Asigns random delay and distance between enemy instances
        this.y = this.rangeY[Math.floor(Math.random() * this.rangeY.length)]; // Asigns enemies to random rows
        // The image/sprite for our enemies, this uses
        // A helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x > 500 ? this.reRender() : this.x += this.speed * dt;
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // This method will reposition the enemy to the left side of the canvas
    // and asign it to a random row, give it a random speed 
    // and random delay before reappearing on canvas
    reRender() {
        this.x = this.rangeX[Math.floor(Math.random() * this.rangeX.length)];
        this.y = this.rangeY[Math.floor(Math.random() * this.rangeY.length)];
        this.speed = this.speedRange[Math.floor(Math.random() * this.speedRange.length)];
    }
}

// Player class
class Player {
    // Player constructor loads the palyer image and positions it on the canvas
    constructor() {
        this.x = 200;
        this.y = 405;
        this.sprite = 'images/char-boy.png';
    }

    // Method checks if the player is colliding with any of the enemy instances
    update() {
        // Loops over allEnemies array to check for collisions
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + 70 >= this.x && enemy.x - 50 <= this.x)) {
                // If the objects are touching send the player to the starting position
                this.reposition()
                }
        }
    }

    // Sends the player back to the starting position
    reposition() {
        this.x = 200;
        this.y = 405;
    }

    // Hendles the input and updates the player's position
    handleInput(key) {
        if (key === 'up') {
            this.y -= 83;
            // If the wather is reached the game is won
            this.y === -10 ? this.reposition() : this.y;
        } else if (key === 'down') {
            this.y = this.y === 405 ? this.y : this.y += 83;
        } else if (key === 'right') {
            this.x = this.x === 400 ? this.x : this.x += 100;
        } else {
            this.x = this.x === 0 ? this.x : this.x -= 100;
        }
    }

    // Renders the player figure on the canvas
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Creates the enemy instances and stores them in the array
const allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
// Place the player object in a variable called player
const player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});