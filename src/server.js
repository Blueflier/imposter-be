const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { GameManager } = require('./game/gameManager');
const { EVENTS } = require('./events/socketEvents');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const gameManager = new GameManager();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on(EVENTS.JOIN, ({ username }) => {
    gameManager.addPlayer(socket.id, username);
    
    // Send player ID to the joining player
    socket.emit(EVENTS.PLAYER_ID, socket.id);
    
    // Send player-specific state to the joining player
    socket.emit(EVENTS.GAME_STATE, gameManager.getPlayerState(socket.id));
    
    // Send public state to all other players
    socket.broadcast.emit(EVENTS.GAME_STATE, gameManager.getPublicState());
  });

  socket.on(EVENTS.START_GAME, () => {
    if (gameManager.isPlayerHost(socket.id) && gameManager.startNewRound()) {
      // Send personalized state to each player
      gameManager.players.forEach((_, playerId) => {
        io.to(playerId).emit(EVENTS.GAME_STATE, gameManager.getPlayerState(playerId));
      });
    }
  });

  socket.on('disconnect', () => {
    gameManager.removePlayer(socket.id);
    // Notify all remaining players of the state change
    io.emit(EVENTS.GAME_STATE, gameManager.getPublicState());
  });
});

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});