class NumberGuessingGame {
    constructor() {
        this.playerName = '';
        this.maxNumber = 0;
        this.targetNumber = 0;
        this.lives = 3;
        this.attempts = 0;
        this.gameActive = false;

        // DOM Elements
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.playerNameInput = document.getElementById('player-name');
        this.startGameBtn = document.getElementById('start-game');
        this.guessInput = document.getElementById('guess-input');
        this.submitGuessBtn = document.getElementById('submit-guess');
        this.playerDisplay = document.getElementById('player-display');
        this.livesDisplay = document.getElementById('lives');
        this.maxNumberDisplay = document.getElementById('max-number');
        this.messageDisplay = document.getElementById('message');
        this.hintDisplay = document.getElementById('hint');
        this.resultMessage = document.getElementById('result-message');
        this.attemptsDisplay = document.getElementById('attempts');
        this.playAgainBtn = document.getElementById('play-again');

        // Event Listeners
        this.startGameBtn.addEventListener('click', () => this.startGame());
        this.submitGuessBtn.addEventListener('click', () => this.makeGuess());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.makeGuess();
        });
    }

    // Initialize the game
    startGame() {
        this.playerName = this.playerNameInput.value.trim();
        if (!this.playerName) {
            this.showMessage('Please enter your name!', 'error');
            return;
        }

        // Set max number based on name length (minimum 10)
        this.maxNumber = Math.max(10, this.playerName.length * 5);
        this.targetNumber = this.generateRandomNumber(1, this.maxNumber);
        this.gameActive = true;
        this.lives = 3;
        this.attempts = 0;

        // Update UI
        this.playerDisplay.textContent = this.playerName;
        this.maxNumberDisplay.textContent = this.maxNumber;
        this.livesDisplay.textContent = this.lives;
        this.switchScreen(this.gameScreen);
    }

    // Generate random number using Divide and Conquer
    generateRandomNumber(min, max) {
        const range = max - min + 1;
        const mid = Math.floor(range / 2);
        const randomOffset = Math.floor(Math.random() * range);
        return min + randomOffset;
    }

    // Make a guess using Divide and Conquer strategy
    makeGuess() {
        if (!this.gameActive) return;

        const guess = parseInt(this.guessInput.value);
        if (isNaN(guess) || guess < 1 || guess > this.maxNumber) {
            this.showMessage(`Please enter a number between 1 and ${this.maxNumber}`, 'error');
            return;
        }

        this.attempts++;
        this.guessInput.value = '';

        if (guess === this.targetNumber) {
            this.gameWon();
        } else {
            this.lives--;
            this.livesDisplay.textContent = this.lives;

            // Provide hint on last life
            if (this.lives === 1) {
                this.provideHint();
            }

            if (this.lives === 0) {
                this.gameLost();
            } else {
                const message = guess < this.targetNumber ? 'Too low!' : 'Too high!';
                this.showMessage(message, 'error');
            }
        }
    }

    // Provide hint using Divide and Conquer
    provideHint() {
        const range = this.maxNumber - 1;
        const mid = Math.floor(range / 2);
        let hint;

        if (this.targetNumber <= mid) {
            hint = `The number is in the lower half (1-${mid})`;
        } else {
            hint = `The number is in the upper half (${mid + 1}-${this.maxNumber})`;
        }

        this.hintDisplay.textContent = hint;
        this.hintDisplay.style.display = 'block';
    }

    // Game won
    gameWon() {
        this.gameActive = false;
        this.resultMessage.textContent = `Congratulations ${this.playerName}! You won!`;
        this.attemptsDisplay.textContent = this.attempts;
        this.switchScreen(this.resultScreen);
    }

    // Game lost
    gameLost() {
        this.gameActive = false;
        this.resultMessage.textContent = `Game Over! The number was ${this.targetNumber}`;
        this.attemptsDisplay.textContent = this.attempts;
        this.switchScreen(this.resultScreen);
    }

    // Reset game
    resetGame() {
        this.playerNameInput.value = '';
        this.guessInput.value = '';
        this.hintDisplay.style.display = 'none';
        this.messageDisplay.textContent = '';
        this.switchScreen(this.welcomeScreen);
    }

    // Switch between screens
    switchScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }

    // Show message
    showMessage(message, type) {
        this.messageDisplay.textContent = message;
        this.messageDisplay.className = `message ${type}`;
    }
}

// Initialize the game
const game = new NumberGuessingGame(); 