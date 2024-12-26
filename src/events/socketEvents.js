/**
 * Socket event names used in the application
 */
const EVENTS = {
  // Client -> Server
  JOIN: 'join',
  START_GAME: 'startGame',
  NEXT_ROUND: 'nextRound',
  
  // Server -> Client
  GAME_STATE: 'gameState',
  PLAYER_ID: 'playerId'
};

module.exports = { EVENTS };