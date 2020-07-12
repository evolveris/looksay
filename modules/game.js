class Game
{
    constructor() {
        this._players = [];
    }

    addPlayer(newPlayer) {
        this._players.push(newPlayer);
    }
}

module.exports = Game;
