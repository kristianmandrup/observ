var test    = require("tape")

var Observ  = require("../index")
var lazyObserv = require("../lazy-observ")

test("lazyObserv is a function", function (assert) {
    assert.equal(typeof lazyObserv, "function")
    assert.end()
})


test("calling lazyObserv returns observable: function", function (assert) {
    assert.equal(typeof lazyObserv(1), "function")
    assert.end()
})

test("lazy Observ has lazyness API", function (assert) {
    var obj = lazyObserv(7);

    // assert.equal(arr[0], 3)
    assert.equal(typeof obj.lazySet, "function")

    assert.equal(obj.isObservable(), true)
    assert.equal(obj.isComputed(), false)

    assert.equal(obj.isLazy(), true)
    obj = obj.unlazy()
    assert.equal(obj.isLazy(), false)
    assert.end()
})

test("Observ can act lazy", function (assert) {
    var obj = Observ(7).actLazy();

    // assert.equal(arr[0], 3)
    assert.equal(typeof obj.set, "function")

    assert.equal(obj.isObservable(), true)
    assert.equal(obj.isComputed(), false)

    assert.equal(obj.isLazy(), true)

    obj.set(2);
    obj.set(3);

    var scheduler = obj.scheduler;
    assert.equal(scheduler.scheduled.anyOps(), true)
    assert.equal(scheduler.scheduled.numOps(), 2)

    obj.updateNow();

    assert.equal(scheduler.scheduled.anyOps(), false)
    assert.equal(scheduler.scheduled.numOps(), 0)

    assert.equal(obj.get(), 3);

    obj = obj.unlazy()
    assert.equal(obj.isLazy(), false)

    assert.end()
})


test("Observ can be turned into lazy Observ", function (assert) {
    var obj = Observ(8);

    assert.equal(typeof obj.lazySet, "undefined")

    assert.equal(obj.isLazy(), false)
    obj = obj.lazy()
    assert.equal(obj.isLazy(), true)
    assert.equal(typeof obj.lazySet, "function")
    assert.end()
})


test("using lazyObserv allows lazy playback", function (assert) {
    var obj = lazyObserv(1);

    assert.equal(obj.get(), 1)
    obj.lazySet(2);
    obj.lazySet(3);

    var scheduler = obj.scheduler;
    assert.equal(typeof scheduler, "object")
    assert.equal(scheduler.scheduled.anyOps(), true)
    assert.equal(scheduler.scheduled.numOps(), 2)

    scheduler.executeNextScheduled();
    assert.equal(obj.get(), 3)

    assert.end()
})
