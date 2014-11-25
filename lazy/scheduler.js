// can be reused for all observables

var extend = require('xtend')

module.exports = function(obj, opts) {
  opts = opts || {}
  opts.maxOpsPerFrame = opts.maxOpsPerFrame || 500
  var outer = {
    obj: obj,
    maxOpsPerFrame: opts.maxOpsPerFrame,
    executeNextScheduled: function() {
      this.scheduled.executeNext();
    },
    executeAllScheduled: function() {
      this.scheduled.executeAll();
    },
    isWithinCurrentFrame: function(frameOps) {
      frameOps = frameOps || this.scheduled.frameOps();
      return frameOps.length < this.maxOpsPerFrame;
    },
    addFrameOp: function(mutator, opts) {
      var frameOps = this.scheduled.frameOps();
      frameOps.push(mutator);
      this.onScheduled(frameOps)
    },
    schedule: function(mutator, opts) {
      if (!this.isWithinCurrentFrame()) {
        this.scheduled.addFrameBuffer();
      }
      this.addFrameOp(mutator);

      return this.scheduled.frameOps();
    },
    // hook: override to log scheduled operations as they are added
    onScheduled: function(ops) {
    }
  }

  var scheduled = {
    obj: obj,
    ops: [[]],
    addFrameBuffer: function() {
      this.ops.push([]);
    },
    frameIndex: function() {
      return Math.max(this.ops.length-1, 0);
    },
    setFrameOps: function(frameOps) {
      this.ops[this.frameIndex()] = frameOps;
    },
    frameOps: function() {
      return this.ops[this.frameIndex()] || [];
    },
    numOps: function() {
      return this.frameOps().length;
    },
    anyOps: function() {
      return this.numOps() > 0;
    },
    executeAll: function () {
      while(this.anyOps()) {
        this.executeNext();
      }
    }
  };
  var scheduling = opts.scheduling;
  outer.scheduled = scheduled

  outer = extend(outer, scheduling.outer || {})
  outer.scheduled = extend(outer.scheduled, scheduling.scheduled || {})

  return outer;
}
