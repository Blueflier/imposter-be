const { subjects } = require('../data/subjects');
const { validateGameStart } = require('../utils/gameValidation');

class GameManager {
  constructor() {
    this.players = new Map();
    this.status = 'waiting';
    this.currentSubject = '';
    this.currentMessage = '';
    this.imposterPlayerId = null;
  }

  addPlayer(id, username) {
    const isFirstPlayer = this.players.size === 0;
    const player = {
      id,
      username,
      isHost: isFirstPlayer,
      currentMessage: '',
      isImposter: false
    };
    this.players.set(id, player);
    return player;
  }

  removePlayer(id) {
    const player = this.players.get(id);
    this.players.delete(id);
    
    if (player?.isHost && this.players.size > 0) {
      const newHost = this.players.values().next().value;
      newHost.isHost = true;
    }

    // Reset game if not enough players
    if (this.status === 'playing' && this.players.size < 3) {
      this.resetGame();
    }
  }

  resetGame() {
    this.status = 'waiting';
    this.currentSubject = '';
    this.currentMessage = '';
    this.imposterPlayerId = null;
    
    this.players.forEach(player => {
      player.currentMessage = '';
      player.isImposter = false;
    });
  }

  startNewRound() {
    const validation = validateGameStart(this.players.size);
    if (!validation.valid) {
      return false;
    }

    this.status = 'playing';
    
    const randomIndex = Math.floor(Math.random() * subjects.length);
    const { subject, messages } = subjects[randomIndex];
    this.currentSubject = subject;
    this.currentMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const playerIds = Array.from(this.players.keys());
    this.imposterPlayerId = playerIds[Math.floor(Math.random() * playerIds.length)];
    
    this.players.forEach((player, playerId) => {
      player.isImposter = playerId === this.imposterPlayerId;
      player.currentMessage = player.isImposter ? 'IMPOSTER' : this.currentMessage;
    });

    return true;
  }

  getPlayerState(playerId) {
    const player = this.players.get(playerId);
    if (!player) return null;

    return {
      status: this.status,
      players: Array.from(this.players.values()).map(p => ({
        id: p.id,
        username: p.username,
        isHost: p.isHost
      })),
      subject: this.status === 'playing' ? this.currentSubject : undefined,
      message: this.status === 'playing' ? player.currentMessage : undefined,
      isImposter: this.status === 'playing' ? player.isImposter : undefined
    };
  }

  getPublicState() {
    return {
      status: this.status,
      players: Array.from(this.players.values()).map(p => ({
        id: p.id,
        username: p.username,
        isHost: p.isHost
      }))
    };
  }

  isPlayerHost(playerId) {
    return this.players.get(playerId)?.isHost || false;
  }
}

module.exports = { GameManager };