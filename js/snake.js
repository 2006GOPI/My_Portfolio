const snakeGame = {
    gridSize: 20,
    speed: 150,
    snake: [],
    food: null,
    direction: 'right',
    nextDirection: 'right',
    gameInterval: null,
    score: 0,
    highScore: localStorage.getItem('snakeHighScore') || 0,
    isPlaying: false,

    elements: {
        board: null,
        score: null,
        highScore: null,
        modal: null,
        startBtn: null,
        restartBtn: null
    },

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.updateScore(0);
        this.elements.highScore.textContent = this.highScore;
    },

    cacheDOM() {
        this.elements.board = document.getElementById('game-board');
        this.elements.score = document.getElementById('current-score');
        this.elements.highScore = document.getElementById('best-score');
        this.elements.modal = document.getElementById('snake-game-modal');
        this.elements.startBtn = document.getElementById('start-game-btn');
        this.elements.restartBtn = document.getElementById('restart-game-btn');
    },

    bindEvents() {
        document.addEventListener('keydown', this.handleInput.bind(this));
        this.elements.startBtn.addEventListener('click', this.startGame.bind(this));
        this.elements.restartBtn.addEventListener('click', this.startGame.bind(this));

        // Touch controls support
        const dPadButtons = document.querySelectorAll('.d-pad-btn');
        dPadButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dir = e.currentTarget.dataset.dir;
                this.handleInput({ key: `Arrow${dir.charAt(0).toUpperCase() + dir.slice(1)}` });
            });
        });
    },

    openModal() {
        this.elements.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.resetGame();
    },

    closeModal() {
        this.elements.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.stopGame();
    },

    startGame() {
        if (this.isPlaying) return;
        this.resetGame();
        this.isPlaying = true;
        this.elements.startBtn.style.display = 'none';
        this.elements.restartBtn.style.display = 'block';
        this.gameInterval = setInterval(this.gameLoop.bind(this), this.speed);
    },

    stopGame() {
        this.isPlaying = false;
        clearInterval(this.gameInterval);
        this.elements.startBtn.style.display = 'block';
        this.elements.restartBtn.style.display = 'none';
    },

    resetGame() {
        this.stopGame();
        this.snake = [{ x: 10, y: 10 }];
        this.respawnFood();
        this.direction = 'right';
        this.nextDirection = 'right';
        this.score = 0;
        this.updateScore(0);
        this.draw();
    },

    gameLoop() {
        this.direction = this.nextDirection;
        const head = { ...this.snake[0] };

        switch (this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        // Collision Check (Walls)
        if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
            this.gameOver();
            return;
        }

        // Collision Check (Self)
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

        // Check Food
        if (head.x === this.food.x && head.y === this.food.y) {
            this.updateScore(this.score + 10);
            this.respawnFood();
            // Speed up slightly
            if (this.score % 50 === 0 && this.speed > 50) {
                clearInterval(this.gameInterval);
                this.speed -= 5;
                this.gameInterval = setInterval(this.gameLoop.bind(this), this.speed);
            }
        } else {
            this.snake.pop();
        }

        this.draw();
    },

    respawnFood() {
        let newFood;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * 20) + 1,
                y: Math.floor(Math.random() * 20) + 1
            };
            const onSnake = this.snake.some(s => s.x === newFood.x && s.y === newFood.y);
            if (!onSnake) break;
        }
        this.food = newFood;
    },

    draw() {
        this.elements.board.innerHTML = '';

        // Draw Snake
        this.snake.forEach((segment, index) => {
            const el = document.createElement('div');
            el.style.gridColumnStart = segment.x;
            el.style.gridRowStart = segment.y;
            el.classList.add(index === 0 ? 'snake-head' : 'snake-body');
            this.elements.board.appendChild(el);
        });

        // Draw Food
        const foodEl = document.createElement('div');
        foodEl.style.gridColumnStart = this.food.x;
        foodEl.style.gridRowStart = this.food.y;
        foodEl.classList.add('food');
        this.elements.board.appendChild(foodEl);
    },

    handleInput(e) {
        if (!this.isPlaying) return;

        const key = e.key;
        const goingUp = this.direction === 'up';
        const goingDown = this.direction === 'down';
        const goingLeft = this.direction === 'left';
        const goingRight = this.direction === 'right';

        if ((key === 'ArrowUp' || key === 'w') && !goingDown) this.nextDirection = 'up';
        if ((key === 'ArrowDown' || key === 's') && !goingUp) this.nextDirection = 'down';
        if ((key === 'ArrowLeft' || key === 'a') && !goingRight) this.nextDirection = 'left';
        if ((key === 'ArrowRight' || key === 'd') && !goingLeft) this.nextDirection = 'right';
    },

    updateScore(newScore) {
        this.score = newScore;
        this.elements.score.textContent = this.score;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.elements.highScore.textContent = this.highScore;
            localStorage.setItem('snakeHighScore', this.highScore);
        }
    },

    gameOver() {
        this.stopGame();
        // Optional: Shake effect or alert
        this.elements.board.style.animation = 'shake 0.5s';
        setTimeout(() => this.elements.board.style.animation = '', 500);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    snakeGame.init();
});

// Add keyframes for shake
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
}
`;
document.head.appendChild(style);
