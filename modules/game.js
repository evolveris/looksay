class Game
{
    constructor() {
        this._players = new Map();
        this._round = 1;
        this._currentPlayer = null;
    }

    addPlayer(socketId, newPlayer) {
        this._players.set(socketId, newPlayer);
    }

    getPlayers() {
        return Array.from(this._players.values());
    }

    get currentPlayer() {
        return this._currentPlayer;
    }

    setCurrentPlayer(playerSocketId) {
        if (!this._players.has(playerSocketId)) {
            throw new Error(`Could not find player with socket ID ${playerSocketId}`);
        }

        this._currentPlayer = this._players.get(playerSocketId);
    }

    removePlayerBySocketId(socketId)
    {
        this._players.delete(socketId);
    }

    isResponseCorrect(response) {
        return response.length < 4;
    }
    
    get round() {
        return this._round;
    }

    incrementRound() {
        this._round++;
    }

    isReady() {
        for (const player of this._players.values()) {
            if (!player.isReady) {
               return false;
            }
        }

        return true;
    }
}

const game = new Game();

module.exports = game;
