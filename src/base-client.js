const HttpProvider = require('./providers').HttpProvider

/**
 * Base class that client wrappers extend.
 */
class BaseClient {
  constructor (provider) {
    if (provider === undefined) {
      provider = new HttpProvider()
    }
    if (provider instanceof String || typeof provider === 'string') {
      provider = new HttpProvider({
        endpoint: provider
      })
    }
    this.provider = provider
  }
}

module.exports = BaseClient
