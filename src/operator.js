const utils = require('plasma-utils')
const BaseClient = require('./base-client')

/**
 * Wrapper for interacting with the operator.
 */
class OperatorClient extends BaseClient {
  /**
   * Gets block metadata for several blocks.
   * @param {number} start First block to query.
   * @param {number} end Last block to query.
   * @return {Array<*>} A list of block metadata objects.
   */
  async getBlockMetadata (start, end = start) {
    return this.provider.handle('getBlockMetadata', [start, end], true)
  }

  /**
   * Returns transactions in a block.
   * @param {number} block Number of the block to query.
   * @param {number} start First transaction to query.
   * @param {number} end Last transaction to query.
   */
  async getBlockTransactions (block, start, end) {
    return this.provider.handle(
      'getBlockTransactions',
      [block, start, end],
      true
    )
  }

  /**
   * Submits a block to the root chain.
   */
  async submitBlock () {
    return this.provider.handle('pg_submitBlock')
  }

  /**
   * Returns a transaction by hash.
   * @param {string} hash The transaction hash.
   * @return {SignedTransaction} The signed transaction.
   */
  async getTransaction (hash) {
    hash = utils.utils.remove0x(hash)
    return this.provider.handle('getTxFromHash', [hash], true)
  }

  /**
   * Returns the most recent transactions.
   * @param {number} start First transaction to query.
   * @param {number} end Last transaction to query.
   * @return {Array<SignedTransaction>} List of most recent transactions.
   */
  async getRecentTransactions (start, end) {
    return this.provider.handle('getRecentTransactions', [start, end], true)
  }

  /**
   * Returns the current block number.
   * @return {number} The current block number.
   */
  async getCurrentBlock () {
    return this.provider.handle('getBlockNumber', [], true)
  }
}

module.exports = OperatorClient
