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
}

module.exports = OperatorClient
