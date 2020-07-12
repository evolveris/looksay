const Game = require("./game");
const game = new Game();

const Player = require("./player");

module.exports = io => {
    io.on('connection', (socket) => {
        console.log('a user connected');
      
        socket.on("player_registered", (playerInfo, fn) => { 

            const player = new Player(playerInfo.player_name);
            game.addPlayer(player);

            return fn(true);
        });
    
        socket.on("player_ready", (msg) => { console.log(msg) });
        socket.on("player_game_input", (msg) => { console.log(msg) });
        socket.on("player_chat_message", (msg) => { console.log(msg) });
    
    
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });
};
