const axios = require('axios')
const uuidv4 = require('uuid/v4')
const utils = require('plasma-utils')

const BaseProvider = require('./base-provider')

const defaultOptions = {
  endpoint: 'http://localhost:9898'
}

/**
 * Provides communication with nodes that expose a JSON-RPC interface over HTTP.
 */
class HttpProvider extends BaseProvider {
  constructor (options) {
    super(options, defaultOptions)

    this.http = axios.create({
      baseURL: this.options.endpoint
    })
  }

  get name () {
    return 'http'
  }

  async handle (method, params, convert = false) {
    const rawResponse = await this.http.post('/', {
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: uuidv4()
    })
    const response = utils.utils.isString(rawResponse.data)
      ? JSON.parse(rawResponse.data)
      : rawResponse.data

    if (response.error) {
      throw new Error(response.message)
    }
    if (convert) {
      response.result = this._convertBuffers(response.result)
    }
    return response.result
  }

  /**
   * Converts any buffer items into hex strings.
   * Necessary until we stop pumping buffers out of the operator.
   * @param {*} response A response object.
   * @return {*} Parsed response with converted buffers.
   */
  _convertBuffers (response) {
    if (Array.isArray(response)) {
      return response.map((item) => {
        return this._convertBuffers(item)
      })
    } else if (typeof response !== 'object' || response === null) {
      return response
    } else if (this._isBuffer(response)) {
      return this._convertBuffer(response)
    }

    for (let field in response) {
      if (this._isBuffer(response[field])) {
        response[field] = this._convertBuffer(response[field])
      }
    }
    return response
  }

  /**
   * Converts a buffer to a hex string.
   * @param {Buffer} value A buffer.
   * @return {string} Buffer as a hex string.
   */
  _convertBuffer (value) {
    return Buffer.from(value).toString('hex')
  }

  /**
   * Checks if value is a buffer.
   * @param {*} value Value to check.
   * @return {boolean} `true` if the value is a buffer, `false` otherwise.
   */
  _isBuffer (value) {
    return value && value.type === 'Buffer'
  }
}

module.exports = HttpProvider
