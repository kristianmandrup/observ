module.exports = ObservLazyPrimitive

var scheduler  = require("./lazy/primitive-scheduler.js")
var lazySet    = require('./lazy/lazy-set')

var Observ = require('./index')

function ObservLazyPrimitive(primitive, opts, lv) {
  opts = opts || {maxOpsPerFrame: scheduler.maxOpsPerFrame}
  var obs = Observ(primitive, opts, lv);
  var schedulerBuilder = opts.schedulerBuilder || scheduler.create;

  obs.scheduler = new schedulerBuilder(obs, opts);
  obs.lazy();
  return obs;
}
