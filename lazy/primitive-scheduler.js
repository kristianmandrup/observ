var execute = require('./execute')

// customize to fit your scenario (and machine speed of client)
var PrimitiveScheduler = {
  // when Frame Time API has landed, we can track how much CPU-time is spent on each frame and
  // perhaps use this as feedback to tune the maxOpsPerFrame if necessary...
  maxOpsPerFrame: 1200,

  // uses generic scheduler and adds generic execute function
  create: function(obs, opts) {
    opts = opts || {}
    opts.execute = execute;
    return require('./scheduler')(obs, opts)
  }
};

module.exports = PrimitiveScheduler;
