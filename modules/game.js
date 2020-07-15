class Game
{
    constructor() {
        this._players = new Map();
        this._round = 1;
    }

    addPlayer(socketId, newPlayer) {
        this._players.set(socketId, newPlayer);
    }

    getPlayers() {
        return Array.from(this._players.values());
    }

    removePlayerBySocketId(socketId)
    {
        this._players.delete(socketId);
    }

    isResponseCorrect(playerGameInput) {
        if (playerGameInput.length < 4) {
            return true;
        }

        return false;
    }
    
    get round() {
        return this._round;
    }

    set round(increment) {
        this._round += increment;
    }
}

const game = new Game();

module.exports = game;
