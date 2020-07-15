const game = require("./game");
const Player = require("./player");
const Game = require("./game");

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

        socket.on("player_game_input", (msg) => { 
          // io.emit('player_chat_message', msg);
          // take the player game input and check if correct
          // Game.isResponseCorrect(msg)
          // if correct, update the score accordingly (increment or decrement)
          // then emit another "score_update" event
          io.emit('score_update', msg); 
          // client-side socket-io will listen 
          // to it and update the score in the DOM when the computation is ready
         
          
          // when ready, the message needs to be sent to 
          // the other player only 
          io.emit('player_sequence_update', msg); 
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
