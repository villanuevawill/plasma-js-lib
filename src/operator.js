const utils = require('plasma-utils')
const BaseClient = require('./base-client')
const models = utils.serialization.models
const SignedTransaction = models.SignedTransaction

/**
 * Wrapper for interacting with the operator.
 */
class OperatorClient extends BaseClient {
  /**
   * Gets block metadata for several blocks.
   * @param {number} start First block to query.
   * @param {number} end Last block to query.
   * @return {Array} A list of block metadata objects.
   */
  async getBlockMetadata (start, end = start) {
    return this.provider.handle('getBlockMetadata', [start, end], true)
  }

  /**
   * Returns transactions in a block.
   * @param {number} block Number of the block to query.
   * @param {number} start First transaction to query.
   * @param {number} end Last transaction to query.
   * @return {Array} List of transactions.
   */
  async getBlockTransactions (block, start, end) {
    return this.provider.handle(
      'getBlockTransactions',
      [block, start, end],
      true
    )
  }

  /**
   * Returns a transaction by hash.
   * @param {string} hash The transaction hash.
   * @return {SignedTransaction} The signed transaction.
   */
  async getTransaction (hash) {
    hash = utils.utils.remove0x(hash)
    const tx = await this.provider.handle('getTxFromHash', [hash], true)
    return new SignedTransaction(tx)
  }

  /**
   * Returns the most recent transactions.
   * @param {number} start First transaction to query.
   * @param {number} end Last transaction to query.
   * @return {Array<SignedTransaction>} List of most recent transactions.
   */
  async getRecentTransactions (start, end) {
    const txs = await this.provider.handle(
      'getRecentTransactions',
      [start, end],
      true
    )

    return txs
      .filter((tx) => {
        return !utils.utils.isString(tx)
      })
      .map((tx) => {
        return new SignedTransaction(tx)
      })
  }

  /**
   * Returns the current block number.
   * @return {number} The current block number.
   */
  async getCurrentBlock () {
    const currentBlock = await this.provider.handle('getBlockNumber', [], true)
    return parseInt(currentBlock)
  }

  /**
   * Submits the current block to the root chain.
   * @return {number} Number of the submitted block.
   */
  async submitBlock () {
    const response = await this.provider.handle('newBlock')
    return parseInt(response.newBlockNumber)
  }
}

module.exports = OperatorClient
