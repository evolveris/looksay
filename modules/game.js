class Game
{
    constructor() {
        this._players = new Map();
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
}

const game = new Game();

module.exports = game;
