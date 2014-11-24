module.exports = isComputed;

function isComputed(value) {
  if (typeof value === 'object' && value._type === 'string') {
    if (value._type.match(/computed/)) {
      return true
    }
  }
  return false;
}
