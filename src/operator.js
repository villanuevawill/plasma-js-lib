const utils = require('plasma-utils')
const BaseClient = require('./base-client')

class OperatorClient extends BaseClient {
  async getBlockMetadata (start, end = start) {
    return this.provider.handle('getBlockMetadata', [start, end], true)
  }

  async getBlockTransactions (block, start, end) {
    return this.provider.handle('getBlockTransactions', [block, start, end], true)
  }

  async submitBlock () {
    return this.provider.handle('pg_submitBlock')
  }

  async getTransaction (hash) {
    hash = utils.utils.remove0x(hash)
    return this.provider.handle('getTxFromHash', [hash], true)
  }

  async getRecentTransactions (start, end) {
    return this.provider.handle('getRecentTransactions', [start, end], true)
  }

  async getCurrentBlock () {
    return this.provider.handle('getBlockNumber', [], true)
  }
}

module.exports = OperatorClient
