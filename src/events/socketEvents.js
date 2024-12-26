/**
 * Socket event names used in the application
 */
const EVENTS = {
  // Client -> Server
  JOIN: 'join',
  START_GAME: 'startGame',
  
  // Server -> Client
  GAME_STATE: 'gameState',
  PLAYER_ID: 'playerId'
};

module.exports = { EVENTS };