/**
 * @typedef {Object} Player
 * @property {string} id
 * @property {string} username
 * @property {boolean} isHost
 */

/**
 * @typedef {Object} PlayerInternal
 * @property {string} id
 * @property {string} username
 * @property {boolean} isHost
 * @property {string} currentMessage
 * @property {boolean} isImposter
 */

/**
 * @typedef {Object} GameState
 * @property {'waiting' | 'playing'} status
 * @property {Player[]} players
 * @property {string} [subject]
 * @property {string} [message]
 * @property {boolean} [isImposter]
 */

/**
 * @typedef {Object} JoinPayload
 * @property {string} username
 */

module.exports = {};