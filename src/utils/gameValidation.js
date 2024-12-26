const { GAME_CONFIG } = require('../config/gameConfig');

/**
 * Validates if a game can be started
 * @param {number} playerCount - Current number of players
 * @returns {{ valid: boolean, error?: string }}
 */
function validateGameStart(playerCount) {
  if (playerCount < GAME_CONFIG.MIN_PLAYERS) {
    return {
      valid: false,
      error: `Need at least ${GAME_CONFIG.MIN_PLAYERS} players to start`
    };
  }
  
  if (playerCount > GAME_CONFIG.MAX_PLAYERS) {
    return {
      valid: false,
      error: `Cannot start with more than ${GAME_CONFIG.MAX_PLAYERS} players`
    };
  }

  return { valid: true };
}

module.exports = { validateGameStart };