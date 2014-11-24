module.exports = lazySet

function lazySet() {
  return function (newValue) {
    this.scheduler.schedule(setter(newValue));
  }
}

function setter(value) {
  return function() {
    return set(value);
  }
}

function set(value) {
  return value;
}
