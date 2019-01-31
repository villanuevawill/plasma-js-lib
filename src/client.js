const BigNum = require('bn.js')
const utils = require('plasma-utils')
const BaseClient = require('./base-client')
const OperatorClient = require('./operator')
const models = utils.serialization.models
const UnsignedTransaction = models.UnsignedTransaction

const toHexString = (value) => {
  return new BigNum(value).toString('hex')
}

/**
 * Acts as a nice wrapper for available JSON-RPC providers.
 */
class PlasmaClient extends BaseClient {
  constructor (provider) {
    super(provider)
    this.operator = new OperatorClient(provider)
  }

  /**
   * Submits a deposit.
   * @param {*} token Token to deposit.
   * @param {*} amount Amount to deposit.
   * @param {*} address Address to deposit to.
   */
  async deposit (token, amount, address) {
    if (!utils.utils.web3Utils.isAddress(address)) {
      token = toHexString(token)
    }
    amount = toHexString(amount)
    return this.provider.handle('pg_deposit', [token, amount, address])
  }

  /**
   * Signs a message.
   * @param {String} address Address to sign with.
   * @param {String} data Message to sign.
   */
  async sign (address, data) {
    return this.provider.handle('pg_sign', [address, data])
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
    let balances = await this.provider.handle('pg_getBalances', [address])
    for (let token in balances) {
      balances[token] = new BigNum(balances[token].toString(), 'hex')
    }
    return balances
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
   * Returns the current block height.
   * @return {Number} Block height.
   */
  async getHeight () {
    return this.provider.handle('pg_getHeight')
  }

  /**
   * Returns some transactions in a specific block.
   * @param {Number} block Number of the block to query.
   * @param {Number} start First transaction to return.
   * @param {Number} end Last transaction to return.
   * @return {Array} A list of transaction objects.
   */
  async getTransactionsInBlock (block, start, end) {
    return this.provider.handle('pg_getTransactionsInBlock', [
      block,
      start,
      end
    ])
  }

  /**
   * Returns the most recent transactions.
   * @param {Number} start First transaction to query.
   * @param {Number} end Last transaction to query.
   * @return {Array} A list of transaction objects.
   */
  async getRecentTransactions (start, end) {
    return this.provider.handle('pg_getRecentTransactions', [start, end])
  }

  /**
   * Returns information about an account by address.
   * @param {String} address An account address.
   * @return {*} The account object.
   */
  async getAccount (address) {
    return this.provider.handle('pg_getAccount', [address])
  }

  /**
   * Returns transactions where an address is either the sender or recipient.
   * @param {*} address An account address.
   * @param {*} start First transaction to query.
   * @param {*} end Last transaction to query.
   * @return {Array} A list of transaction objects.
   */
  async getTransactionsByAddress (address, start, end) {
    return this.provider.handle('pg_getTransactionsByAddress', [
      address,
      start,
      end
    ])
  }

  async getNextBlock () {
    return this.provider.handle('pg_getNextBlock')
  }

  async pickRanges (address, token, amount) {
    return this.provider.handle('pg_pickRanges', [
      address,
      token,
      amount
    ])
  }

  async sendTransactionAuto (from, to, token, amount) {
    token = toHexString(token)
    amount = toHexString(amount)

    const ranges = await this.pickRanges(from, token, amount)
    const nextBlock = await this.getNextBlock()
    const transaction = {
      block: nextBlock,
      transfers: ranges.map((range) => {
        return {
          ...range,
          ...{ sender: from, recipient: to }
        }
      })
    }
    const hash = new UnsignedTransaction(transaction).hash
    const signature = await this.sign(from, hash)
    transaction.signatures = ranges.map(() => {
      return signature
    })
    return this.sendTransaction(transaction)
  }

  async listToken (tokenAddress) {
    return this.provider.handle('pg_listToken', [
      tokenAddress
    ])
  }

  async getTokenId (tokenAddress) {
    return this.provider.handle('pg_getTokenId', [
      tokenAddress
    ])
  }

  async createAccount () {
    return this.provider.handle('pg_createAccount')
  }

  async startExit (address, token, amount) {
    token = toHexString(token)
    amount = toHexString(amount)
    return this.provider.handle('pg_startExit', [address, token, amount])
  }

  async finalizeExits (address) {
    return this.provider.handle('pg_finalizeExits', [address])
  }

  async getExits (address) {
    return this.provider.handle('pg_getExits', [address])
  }
}

module.exports = PlasmaClient
