const game = require("./game");
const Player = require("./player");

module.exports = io => {
    io.on('connection', (socket) => {
        console.log('a user connected', socket);
      
        socket.on("player_registered", (playerInfo, fn) => { 
            const player = new Player(playerInfo.player_name);
            game.addPlayer(player);

            console.log("now, players are ", game.getPlayers());

            return fn(true);
        });
        
        socket.on("player_ready", (msg) => { console.log(msg) });
        socket.on("player_game_input", (msg) => { console.log(msg) });
        socket.on("player_chat_message", (msg, fn) => { 
          console.log(msg) 
          return fn(true);
        });
    
    
        socket.on('disconnect', (arg) => {
          console.log('user disconnected');
          console.log(arg);
        });
      });
};
