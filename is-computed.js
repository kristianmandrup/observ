module.exports = isComputed;

function isComputed(value) {
  if (!value) {
    value = this;
  }
  if (typeof value === 'function' && value._type === 'string') {
    if (value._type.match(/computed/)) {
      return true
    }
  }
  return false;
}
