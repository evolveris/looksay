class Player
{   
    private name: string;
    private score: number;
    private isReady: boolean;

    constructor(name: string) {
        this.name = name;
        this.score = 0;
        this.isReady = false;
    }

    public getName() : string
    {
        return this.name;
    }

    public getScore() : number {
        return this.score;
    }

    public changeScoreBy(scoreAmount: number) : void {
        this.score += scoreAmount;
    }

    public getIsReady() : boolean {
        return this.isReady;
    }

    public setIsReady(status: boolean) : void {
        this.isReady = status;
    }

}

module.exports = Player;
