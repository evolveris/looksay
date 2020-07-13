class Game
{
    constructor() {
        this._players = [];
    }

    addPlayer(newPlayer) {
        this._players.push(newPlayer);
    }

    getPlayers() {
        return this._players;
    }
}

const game = new Game();

module.exports = game;
