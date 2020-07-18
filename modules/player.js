class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.isReady = false;
    }
    getName() {
        return this.name;
    }
    getScore() {
        return this.score;
    }
    changeScoreBy(scoreAmount) {
        this.score += scoreAmount;
    }
    getIsReady() {
        return this.isReady;
    }
    setIsReady(status) {
        this.isReady = status;
    }
}
module.exports = Player;
//# sourceMappingURL=player.js.map