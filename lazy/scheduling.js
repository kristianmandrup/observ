var api = require('./execute')

module.exports = {
  scheduled: {
    executeNext: api.executeNext,
    executeAll:  api.executeAll
  }
}
