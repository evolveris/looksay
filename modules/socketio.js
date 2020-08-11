const game = require("./game");
const Player = require("./player");

module.exports = io => {
    io.on('connection', (socket) => {
        console.log('a user connected with socket id', socket.id);
        socket.on("player_registered", (playerInfo, fn) => {
            const player = new Player(playerInfo.player_name);
            game.addPlayer(socket.id, player);
            console.log("Current game: ", game);
            return fn(true);
        });
        socket.on("player_ready", (msg) => {
            const player = game.getPlayerBySocketId(socket.id);
            player.setIsReady(true);

            if (game.isReady()) {
                io.emit('game_has_started');
            }
        });
        socket.on("player_game_input", (currentSequence, playerGameInput) => {
            // io.emit('player_chat_message', msg);
            // setCurrentPlayer(socket.id)

            let correctSequence = game.getSequence(currentSequence);
            let score = 0;
            if (playerGameInput == correctSequence) {
                score = 1;
            } else {
                score = -1;
            }

            // TODO: update score only for the current player
            io.emit('player_score_update', score);
            io.emit('player_sequence_update', game.getSequence(correctSequence));
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
