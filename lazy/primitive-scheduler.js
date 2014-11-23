// customize to fit your scenario (and machine speed of client)
var PrimitiveScheduler = {
  maxOpsPerFrame: 1200,
  create: require('./scheduler')
};

module.exports = PrimitiveScheduler;
