var test    = require("tape")
// var Observ  = require("../index")

var lazyObserv = require("../lazy-observ")

test("lazyObserv is a function", function (assert) {
    assert.equal(typeof lazyObserv, "function")
    assert.end()
})


test("calling lazyObserv returns observable: function", function (assert) {
    assert.equal(typeof lazyObserv(1), "function")
    assert.end()
})


test("using lazyObserv allows lazy playback", function (assert) {
    var obj = lazyObserv(1);

    assert.equal(obj.get(), 1)
    obj.set(2);
    obj.set(3);

    var scheduler = obj.scheduler;
    assert.equal(typeof scheduler, "object")
    assert.equal(scheduler.scheduled.anyOps(), true)
    assert.equal(scheduler.scheduled.numOps(), 2)

    scheduler.executeScheduled();
    // console.log('OBJECT', obj);
    assert.equal(obj.get(), 3)

    assert.end()
})
