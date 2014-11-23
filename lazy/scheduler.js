var Scheduler = require('./primitive-scheduler')

module.exports = function(obj, opts) {
  opts = opts || {}
  opts.maxOpsPerFrame = opts.maxOpsPerFrame || Scheduler.maxOpsPerFrame || 500
  outer = {
    obj: obj,
    maxOpsPerFrame: opts.maxOpsPerFrame,
    executeScheduled: function() {
      this.scheduled.execute();
    },
    schedule: function(mutator) {
      var frameIndex = this.scheduled.frameIndex();
      var max = this.maxOpsPerFrame;
      var ops = this.scheduled.ops;
      var frameOps = ops[frameIndex] || [];

      if (frameOps.length < max) {
        frameOps.push(mutator);
        this.onScheduled(frameOps)
      }
      return frameOps;
    },
    // hook: override to log scheduled operations as they are added
    onScheduled: function(ops) {
    }
  }

  var scheduled = {
    obj: obj,
    ops: [[]],
    frameIndex: function() {
      return Math.max(this.ops.length-1, 0);
    },
    numOps: function() {
      return this.ops[this.frameIndex()].length;
    },
    anyOps: function() {
      return this.numOps() > 0;
    },
    execute: function() {
      if (!this.anyOps())
        return;

      // always use value of last operation
      var frameOps = this.ops.shift();
      var lastOp = frameOps[frameOps.length -1];
      var newState = lastOp();

      this.obj._set(newState);
    }
  };
  outer.scheduled = scheduled;
  return outer;
}
