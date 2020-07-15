class Player
{
    constructor(name) {
        this._name = name;
        this._score = 0;
        this._isReady = false;
    }

    get name()
    {
        return this._name;
    }

    get score() {
        return this._score;
    }

    changeScoreBy(scoreAmount) {
        this._score += parseInt(scoreAmount, 10);
    }

    get isReady() {
        return this._isReady;
    }

    set isReady(status) {
        this._isReady = !!status;
    }

}

module.exports = Player;
