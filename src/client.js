const DefaultProvider = require('./providers').DefaultProvider

/**
 * Acts as a nice wrapper for available JSON-RPC providers.
 */
class PlasmaClient {
  constructor (provider = new DefaultProvider()) {
    this.provider = provider
  }

  /**
   * Sends a transaction to the client.
   * @param {*} transaction A transaction object.
   * @return {String} The transaction receipt.
   */
  async sendTransaction (transaction) {
    return this.provider.handle('pg_sendTransaction', [transaction])
  }

  /**
   * Returns all available accounts.
   * @return {Array<String>} A list of available account addresses.
   */
  async getAccounts () {
    return this.provider.handle('pg_getAccounts')
  }

  /**
   * Returns the balances of an account.
   * @param {String} address Address of the account to query.
   * @return {*} A list of account balances.
   */
  async getBalances (address) {
    return this.provider.handle('pg_getBalances', [address])
  }

  /**
   * Returns a transaction with the given hash.
   * @param {String} hash Hash of the transaction to query.
   * @return {*} The transaction object.
   */
  async getTransaction (hash) {
    return this.provider.handle('pg_getTransaction', [hash])
  }

  /**
   * Returns information about a specific block.
   * @param {Number} block Number of the block to query.
   * @return {*} The block object.
   */
  async getBlock (block) {
    return this.provider.handle('pg_getBlock', [block])
  }

  /**
   * Returns information about a series of blocks.
   * @param {*} start First block to query.
   * @param {*} end Last block to query.
   * @return {Array} The list of block objects.
   */
  async getBlocks (start, end) {
    return this.provider.handle('pg_getBlocks', [start, end])
  }

  /**
   * Returns some transactions in a specific block.
   * @param {Number} block Number of the block to query.
   * @param {Number} start First transaction to return.
   * @param {Number} end Last transaction to return.
   * @return {Array} A list of transaction objects.
   */
  async getTransactionsInBlock (block, start, end) {
    return this.provider.handle('pg_getTransactionsInBlock', [block, start, end])
  }
}

module.exports = PlasmaClient
