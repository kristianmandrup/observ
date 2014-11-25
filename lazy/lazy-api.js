module.exports = function(opts) {
  var api = {
    actLazy: actLazy,
    isLazy: isLazy
  }

  api.lazy    = makeLazy(opts.methods, opts.scheduler)
  api.unlazy  = makeUnlazy(opts.methods)

  return api;
}

function isLazy() {
  return !!this._lazy;
}

function capitalise(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function actLazy() {
  this.lazy()
  this.basicSet = this.set
  this.set = this.lazySet
  return this;
}

// to force evaluation of scheduled ops now!
function updateAll() {
  this.scheduler.executeAllScheduled();
}

function updateNow() {
  this.scheduler.executeNextScheduled();
}


function makeLazy(methods, scheduler) {
  return function lazy(opts) {
    console.log('lazy', this.isLazy())
    // if I'm already lazy just return me!
    if (this.isLazy()) {
      return this;
    }

    opts = opts || {}

    console.log('add scheduler...')
    // add scheduler
    var schedulerBuilder = opts.schedulerBuilder || scheduler.create;
    this.scheduler   = new schedulerBuilder(this, opts);

    // add operations to force update
    this.updateNow   = updateNow;
    this.updateAll   = updateAll;

    // add specific lazy methods for main API
    var self = this
    console.log('make lazy', methods)
    methods.forEach(function(name) {
      var fullName = "lazy" + capitalise(name);
      var lazyMethodBuilder = require('./lazy-' + name)
      self[fullName] = lazyMethodBuilder()
    })
    // mark observable is lazy
    this._lazy = true
    return this;
  }
}

function noOp() {
}

function makeUnlazy(methods) {
  return function unlazy() {
    // if I'm already not lazy just return me!
    if (!this.isLazy()) {
      return this;
    }
    // execute all scheduled operations
    this.updateAll();
    // remove lazySet

    // remove scheduler
    delete this.scheduler

    // updateNow and updateAll become no-op
    this.updateNow = noOp
    this.updateAll = noOp
    this._lazy = false;
    return this;
  }
}
