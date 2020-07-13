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
        
        socket.on("player_ready", (msg) => { console.log(msg) });
        socket.on("player_game_input", (msg) => { console.log(msg) });
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
