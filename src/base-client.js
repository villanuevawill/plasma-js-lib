const DefaultProvider = require('./providers').DefaultProvider

class BaseClient {
  constructor (provider = new DefaultProvider()) {
    this.provider = provider
  }
}

module.exports = BaseClient
