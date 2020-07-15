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

    isResponseCorrect(response) {
        return response.length < 4;
    }
    
    get round() {
        return this._round;
    }

    incrementRound() {
        this._round++;
    }
}

const game = new Game();

module.exports = game;
