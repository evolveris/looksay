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
    getSequence(playerInput) {
        const arr = playerInput.split("");
        let numberOfOccurences = 1;
        let ans = "";
        for (let i = 1; i < arr.length; i++) {
            const currentElem = arr[i];
            const prevElem = arr[i - 1];
            if (currentElem !== prevElem) {
                ans += numberOfOccurences;
                ans += prevElem;
                numberOfOccurences = 1;
            }
            else {
                numberOfOccurences += 1;
            }
        }
        ans += numberOfOccurences;
        ans += arr[arr.length - 1];
        return ans;
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