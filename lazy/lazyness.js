var scheduler   = require("./primitive-scheduler.js")
var methods = ['set']
var api = require('./lazy-api')

var lazyApi = api({scheduler: scheduler, methods: methods})

module.exports = lazyApi
