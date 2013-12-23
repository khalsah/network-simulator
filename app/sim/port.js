NetSim.Port = function(chassis) {
  this.chassis = chassis;
};

_.extend(NetSim.Port.prototype, Backbone.Events, {

  sendFrame: function(frame) {
    this.trigger("transport", frame);
  }

});