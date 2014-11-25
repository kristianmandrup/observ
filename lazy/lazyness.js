var methodsObj = {}
var methods = ['set']
methods.forEach(function (key) {
  methodsObj[key] = require('./lazy-' + key)
})

var opts = {
  methods: methodsObj,
  scheduler: require("./scheduler-builder.js")
}
var apiBuilder = require('./lazy-api')

module.exports = apiBuilder(opts)
