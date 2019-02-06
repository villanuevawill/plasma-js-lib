const PlasmaClient = require('./src/client')
const PlasmaOperator = require('./src/operator')
const providers = require('./src/providers/index')

PlasmaClient.PlasmaOperator = PlasmaOperator
PlasmaClient.providers = providers

module.exports = PlasmaClient
