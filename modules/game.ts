class Game
{   
    private players: Map<string, Player>;
    private round: number;
    private currentPlayer : Player | null;

    constructor() {
        this.players = new Map();
        this.round = 1;
        this.currentPlayer = null;
    }

    public addPlayer(socketId: string, newPlayer: Player) {
        this.players.set(socketId, newPlayer);
    }

    public getPlayers(): Player[] {
        return [...this.players.values()];
    }

    public getPlayerBySocketId(socketId: string) : Player | null {
        return this.players.get(socketId);
    }

    public getCurrentPlayer(): Player | null {
        return this.currentPlayer;
    }

    public setCurrentPlayer(playerSocketId: string) : void {
        if (!this.players.has(playerSocketId)) {
            throw new Error(`Could not find player with socket ID ${playerSocketId}`);
        }

        this.currentPlayer = this.players.get(playerSocketId);
    }

    public removePlayerBySocketId(socketId: string) : void
    {
        this.players.delete(socketId);
    }

    public isResponseCorrect(response: string) : boolean {
        return response.length < 4;
    }

    public getSequence(playerInput: string) : string {
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
            } else {
                numberOfOccurences += 1;
            }
        }
        
        ans += numberOfOccurences;
        ans += arr[arr.length - 1];
        
        return ans;
    }
    
    public getRound() : number {
        return this.round;
    }

    public incrementRound() : void {
        this.round++;
    }

    public isReady() : boolean {
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

export {};
