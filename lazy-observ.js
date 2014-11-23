module.exports = ObservLazyPrimitive

var primitiveScheduler  = require("./lazy/primitive-scheduler.js")
var lazySet             = require('./lazy/lazy-set')

var Observ = require('./index')

function ObservLazyPrimitive(primitive, opts, lv) {
  opts = opts || {}
  var obj = Observ(primitive, opts, lv);
  var schedulerBuilder = opts.schedulerBuilder || primitiveScheduler.create;

  obj.scheduler = new schedulerBuilder(obj, opts);
  // override set function
  obj._set = obj.set;
  obj.set = lazySet(obj.scheduler);
  return obj;
}
