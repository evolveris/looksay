"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    constructor() {
        this.players = new Map();
        this.round = 1;
        this.currentPlayer = null;
    }
    addPlayer(socketId, newPlayer) {
        this.players.set(socketId, newPlayer);
    }
    getPlayers() {
        return [...this.players.values()];
    }
    getPlayerBySocketId(socketId) {
        return this.players.get(socketId);
    }
    getCurrentPlayer() {
        return this.currentPlayer;
    }
    setCurrentPlayer(playerSocketId) {
        if (!this.players.has(playerSocketId)) {
            throw new Error(`Could not find player with socket ID ${playerSocketId}`);
        }
        this.currentPlayer = this.players.get(playerSocketId);
    }
    removePlayerBySocketId(socketId) {
        this.players.delete(socketId);
    }
    isResponseCorrect(response) {
        return response.length < 4;
    }
    getRound() {
        return this.round;
    }
    incrementRound() {
        this.round++;
    }
    isReady() {
        for (const player of this.players.values()) {
            if (!player.getIsReady()) {
                return false;
            }
        }
        return true;
    }
}
const game = new Game();
module.exports = game;
//# sourceMappingURL=game.js.map