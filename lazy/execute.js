module.exports = {
  executeNext: function () {
    if (!this.anyOps())
      return;

    // always use value of last operation
    var frameOps = this.ops.shift();
    var lastOp = frameOps[frameOps.length -1];
    var newState = lastOp();
    var setIt = this.obj.basicSet || this.obj.set;
    setIt(newState);
  },
  executeAll: function () {
    while(this.anyOps()) {
      this.executeNext();
    }
  }
}
