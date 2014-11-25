module.exports = ObservLazy

var Observ = require('./index')

function ObservLazy(primitive, opts, lv) {
  var obs = Observ(primitive, opts, lv);
  return obs.lazy();
}
