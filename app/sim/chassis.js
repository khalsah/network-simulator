NetSim.Chassis = function(network, portCount) {
  var self = this;
  this.network = network;
  this.ports = _.times(portCount, function(i) {
    var port = new NetSim.Port(self);
  });
};

_.extend(NetSim.Chassis.prototype, Backbone.Events, {
});