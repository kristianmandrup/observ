module.exports = lazySet

function lazySet(scheduler) {
  return function (newValue) {
    scheduler.schedule(setter(newValue));
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
