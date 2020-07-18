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
        return Array.from(this.players.values());
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
