module.exports = isObservable;

function isObservable(value) {
  if (typeof value === 'object' && typeof value._type === 'string') {
    if (value._type.match(/^observ/)) {
      return true
    }
  }
  return false;
}
