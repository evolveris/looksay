const game = require("./game");
const Player = require("./player");

module.exports = io => {
    io.on('connection', (socket) => {
        console.log('a user connected with socket id', socket.id);

        socket.on("player_registered", (playerInfo, fn) => {
            const player = new Player(playerInfo.player_name);
            game.addPlayer(socket.id, player);

            io.emit('player_list_updated', game.getPlayers());

            console.log("Current game: ", game);
            return fn(true);
        });

        socket.on("player_ready", (msg) => {
            const player = game.getPlayerBySocketId(socket.id);
            player.setIsReady(true);
            io.emit('player_list_updated', game.getPlayers());
            if (game.isReady()) {
                const currentPlayerSocketId = game.getNextPlayerSocketId();
                io.emit('all_players_ready', {next_socket_id_to_play: currentPlayerSocketId});
            }
        });

        const playersInGameScreen = [];

        socket.on("in_game_screen", () => {
            playersInGameScreen.push(socket.id);
            let currentPlayerSocketId = game.getNextPlayerSocketId();
            io.emit(
                'turn_start',
                {
                    nextPlayerSocketId: currentPlayerSocketId, 
                    round: game.getRound()
                }
            );
            
        });

        socket.on("player_turn_end", (currentSequence, playerGameAnswer) => {
            let currentPlayerSocketId = game.getNextPlayerSocketId();
            const player = game.getPlayerBySocketId(currentPlayerSocketId);

            let correctSequence = game.getSequence(currentSequence);
            let score = 0; // @todo - the game obj holds the score

            if (playerGameAnswer == correctSequence) {
                player.changeScoreBy(1);
            } else {
                player.changeScoreBy(-1);
            }

            game.incrementRound();
            io.emit('game_round_update', game.getRound());
            io.emit('player_score_update', score);
            io.emit('player_sequence_update', game.getSequence(correctSequence));
            
            io.emit(
                'turn_start',
                {
                    nextPlayerSocketId: currentPlayerSocketId, 
                    round: game.getRound()
                }
            );
        });

        socket.on("player_chat_message", (msg) => {
            io.emit('player_chat_message', msg);
        });
        
        socket.on('disconnect', () => {
            game.removePlayerBySocketId(socket.id);
            console.log(`Player with socket ID ${socket.id} has disconnected`);
            console.log(`Current players: `, game);
        });
    });
};
