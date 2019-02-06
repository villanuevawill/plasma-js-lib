const HttpProvider = require('./http-provider')
const ChromeProvider = require('./chrome-provider')

module.exports = {
  HttpProvider,
  ChromeProvider,
  DefaultProvider: HttpProvider
}
