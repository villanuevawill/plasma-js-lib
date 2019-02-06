const DefaultProvider = require('./providers').DefaultProvider

/**
 * Base class that client wrappers extend.
 */
class BaseClient {
  constructor (provider = new DefaultProvider()) {
    this.provider = provider
  }
}

module.exports = BaseClient
