module.exports = Observable

var lazyness      = require('./lazyness')
var isObservable  = require('./is-observable')
var isComputed    = require('./is-computed')

function Observable(value) {
    var listeners = []
    value = value === undefined ? null : value

    observable.get = function () {
      return value;
    }
    observable.set = function (v) {
        value = v

        for (var i = 0, len = listeners.length; i < len; i++) {
            listeners[i](v)
        }
    }

    // add basic introspection methods
    observable.isObservable = isObservable
    observable.isComputed   = isComputed

    // add basic lazyness methods
    Object.keys(lazyness).forEach(function(key) {
      observable[key] = lazyness[key];
    })
    observable._lazy = false

    observable._type = "observ"
    observable._version = 1

    return observable

    function observable(listener) {
        if (!listener) {
            return value
        }

        listeners.push(listener)

        return function remove() {
            for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1)
                    break
                }
            }
        }
    }
}
