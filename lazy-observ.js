module.exports = ObservLazyPrimitive

var scheduler  = require("./lazy/primitive-scheduler.js")
var lazySet    = require('./lazy/lazy-set')

var Observ = require('./index')

function ObservLazyPrimitive(primitive, opts, lv) {
  opts = opts || {}
  var obj = Observ(primitive, opts, lv);
  var schedulerBuilder = opts.schedulerBuilder || scheduler.create;

  obj.scheduler = new schedulerBuilder(obj, opts);
  obj.lazySet = lazySet(obj.scheduler);
  return obj;
}
