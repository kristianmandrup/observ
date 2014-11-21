module.exports = isComputed;

function isComputed(value) {
  if (typeof value === 'object') {
    if (typeof value._type === 'string') {
      if value._type.match(/^observ/) {
        return true
      }
    }
  }
  return false;
}
