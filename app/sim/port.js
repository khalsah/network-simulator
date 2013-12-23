NetSim.Port = function(chassis, callback) {
  this.chassis = chassis;
  this.callback = callback;
};

_.extend(NetSim.Port.prototype, Backbone.Events, {

  pushFrame: function(frame) {
    this.callback(frame);
  },

  sendFrame: function(frame) {
    this.trigger("frame", frame);
  }

});