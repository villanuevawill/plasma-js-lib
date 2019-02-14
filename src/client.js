const BigNum = require('bn.js')
const utils = require('plasma-utils')
const BaseClient = require('./base-client')
const models = utils.serialization.models
const SignedTransaction = models.SignedTransaction
const UnsignedTransaction = models.UnsignedTransaction

/**
 * Converts a value to a hex string.
 * @param {*} value Value to convert.
 * @return {string} Value as a hex string.
 */
const toHexString = (value) => {
  return new BigNum(value).toString('hex')
}

/**
 * Acts as a nice wrapper for available JSON-RPC providers.
 */
class PlasmaClient extends BaseClient {
  /**
   * Returns all available accounts.
   * @return {Array<string>} A list of available account addresses.
   */
  async getAccounts () {
    return this.provider.handle('pg_getAccounts')
  }

  /**
   * Returns the balances of an account.
   * @param {string} address Address of the account to query.
   * @return {Object} A mapping of tokens to balances.
   */
  async getBalances (address) {
    let balances = await this.provider.handle('pg_getBalances', [address])
    for (let token in balances) {
      balances[token] = new BigNum(balances[token].toString(), 'hex')
    }
    return balances
  }

  /**
   * Returns a list of all exits for a user.
   * @param {address} address Address to return exits for.
   * @return {Array<Exit>} A list of exits.
   */
  async getExits (address) {
    return this.provider.handle('pg_getExits', [address])
  }

  /**
   * Returns a transaction with the given hash.
   * @param {string} hash Hash of the transaction to query.
   * @return {SignedTransaction} The transaction object.
   */
  async getTransaction (hash) {
    const encoded = await this.provider.handle('pg_getTransaction', [hash])
    return new SignedTransaction(encoded)
  }

  /**
   * Returns information about a specific block.
   * @param {number} block Number of the block to query.
   * @return {string} Hash of the block.
   */
  async getBlock (block) {
    return this.provider.handle('pg_getBlockHeader', [block])
  }

  /**
   * Returns the current block height.
   * @return {number} Block height.
   */
  async getCurrentBlock () {
    return this.provider.handle('pg_getCurrentBlock')
  }

  /**
   * Returns the next plasma block number.
   * @return {number} The next block number.
   */
  async getNextBlock () {
    return this.provider.handle('pg_getNextBlock')
  }

  /**
   * Gets the token ID for a given token contract.
   * @param {string} tokenAddress Address of the token's contract.
   * @return {string} The token's ID.
   */
  async getTokenId (tokenAddress) {
    return this.provider.handle('pg_getTokenId', [tokenAddress])
  }

  /**
   * Returns the ETH balance of an account.
   * Queries the main chain, *not* the plasma chain.
   * @param {string} address Address to query.
   * @return {BigNum} Balance of the address.
   */
  async getEthBalance (address) {
    const balance = await this.provider.handle('pg_getEthBalance', [address])
    return new BigNum(balance, 'hex')
  }

  /**
   * @return {number} The latest Ethereum block.
   */
  async getCurrentEthBlock () {
    return this.provider.handle('pg_getCurrentEthBlock')
  }

  /**
   * @return {number} The last block that the client has synced.
   */
  async getLastSyncedBlock () {
    return this.provider.handle('pg_getLastSyncedBlock')
  }

  /**
   * Creates a new account.
   */
  async createAccount () {
    return this.provider.handle('pg_createAccount')
  }

  /**
   * Signs a message.
   * @param {string} address Address to sign with.
   * @param {string} data Message to sign.
   * @return {EthereumSignature} The signed message.
   */
  async sign (address, data) {
    return this.provider.handle('pg_sign', [address, data])
  }

  /**
   * Submits a deposit.
   * @param {string} token Token to deposit.
   * @param {BigNum} amount Amount to deposit.
   * @param {string} address Address to deposit to.
   */
  async deposit (token, amount, address) {
    if (!utils.utils.web3Utils.isAddress(address)) {
      token = toHexString(token)
    }
    amount = toHexString(amount)
    return this.provider.handle('pg_deposit', [token, amount, address])
  }

  /**
   * Picks the best ranges for a given transaction.
   * @param {string} address Address to transact from.
   * @param {string} token Token being sent.
   * @param {BigNum} amount Amount being sent.
   * @return {Array<Range>} List of ranges that cover the transaction.
   */
  async pickRanges (address, token, amount) {
    return this.provider.handle('pg_pickRanges', [address, token, amount])
  }

  /**
   * Sends a raw signed transaction to the client.
   * @param {SignedTransaction} transaction A transaction object.
   * @return {string} The transaction receipt.
   */
  async sendRawTransaction (transaction) {
    return this.provider.handle('pg_sendTransaction', [transaction])
  }

  /**
   * Sends a transaction and picks ranges automatically.
   * @param {string} from Address to send from.
   * @param {string} to Address to send to.
   * @param {string} token Token to send.
   * @param {BigNum} amount Amount to send.
   * @return {string} The transaction receipt.
   */
  async sendTransaction (from, to, token, amount) {
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
    return this.sendRawTransaction(transaction)
  }

  /**
   * Starts an exit for a user.
   * May start more than one exit if user's ranges are broken up.
   * @param {string} address Address to withdraw from.
   * @param {string} token Token to withdraw.
   * @param {BigNum} amount Amount to withdraw.
   * @return {Array<string>} Hashes of the Ethereum exit transactions.
   */
  async startExit (address, token, amount) {
    token = toHexString(token)
    amount = toHexString(amount)
    return this.provider.handle('pg_startExit', [address, token, amount])
  }

  /**
   * Finalizes all possible exits for a user.
   * @param {string} address Address to finalize exits for.
   * @return {Array<string>} Hashes of the Ethereum finalization transactions.
   */
  async finalizeExits (address) {
    return this.provider.handle('pg_finalizeExits', [address])
  }

  /**
   * Lists a token so it can be deposited.
   * @param {string} tokenAddress Address of the token's contract.
   * @return {EthereumTransaction} The Ethereum transaction result.
   */
  async listToken (tokenAddress) {
    return this.provider.handle('pg_listToken', [tokenAddress])
  }

  /**
   * Asks that the operator submit the current block to the root chain.
   * Usually used for testing
   * @return {number} Number of the submitted block.
   */
  async submitBlock () {
    const response = await this.provider.handle('pg_submitBlock')
    return parseInt(response.newBlockNumber)
  }
}

module.exports = PlasmaClient
