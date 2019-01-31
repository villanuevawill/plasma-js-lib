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
    const response = utils.utils.isString(rawResponse.data) ? JSON.parse(rawResponse.data) : rawResponse.data

    if (response.error) {
      console.log(`ERROR: ${response.message}`)
    }
    if (convert) {
      response.result = this._convertBuffers(response.result)
    }
    return response.result
  }

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

  _convertBuffer (field) {
    return Buffer.from(field).toString('hex')
  }

  _isBuffer (field) {
    return field && field.type === 'Buffer'
  }
}

module.exports = HttpProvider
