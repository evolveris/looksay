class Game
{   
    private players: Map<string, Player>;
    private round: number;
    private currentPlayerSocketId : string | null;

    constructor() {
        this.players = new Map();
        this.round = 1;
        this.currentPlayerSocketId = null;
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

    public getNextPlayerSocketId(): string | null {
        if (!this.isReady()) {
            return null;
        }
        
        const socketIdsArr = [...this.players.keys()];

        // on round 1, pick a random socket ID, afterwards, pick the next one
        if (this.round === 1) {
            const randomKey = Math.floor(Math.random() * socketIdsArr.length);
            return this.currentPlayerSocketId = socketIdsArr[randomKey];
        }

        // let's pick the next one from round 1
        let foundSocketIdIndex = socketIdsArr.findIndex(socketId => this.currentPlayerSocketId === socketId);
        if (foundSocketIdIndex === -1) {
            throw new Error(`Socket ID ${this.currentPlayerSocketId} was previously selected, but it doesn't exist anymore.`);
        }

        // get the next one and make sure it stays withing the array boundary
        foundSocketIdIndex = (foundSocketIdIndex + 1) % socketIdsArr.length;
        return this.currentPlayerSocketId = socketIdsArr[foundSocketIdIndex];
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

    public getRandomInitSequence() : string {
        const sequenceLength = this.getRandomInteger(3, 5);
        let initSequence = "";
        for (let i = 0; i < sequenceLength; i++) {
            let randomSequenceNumber = this.getRandomInteger(1, 3);
            initSequence += randomSequenceNumber.toString();
        }
        return initSequence;
    }

    public getRandomInteger(min: number, max: number) : number {
        return Math.floor(Math.random() * (max - min + 1)) + min; 
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
