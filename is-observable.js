module.exports = isObservable;

function isObservable(value) {
  if (!value) {
    value = this;
  }
  if (typeof value === 'function' && typeof value._type === 'string') {
    if (value._type.match(/^observ/)) {
      return true
    }
  }
  return false;
}
