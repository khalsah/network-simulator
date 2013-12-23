(function() {
  var chassisCounter = 0;

  NetSim.Chassis = function(network, portCount) {
    this.id = chassisCounter++;
    this.network = network;
    this._setupPorts(portCount);
  };

  NetSim.Chassis.extend = Backbone.Model.extend;

  _.extend(NetSim.Chassis.prototype, Backbone.Events, {

    availablePort: function() {
      return _.find(this.ports, function(port) {
        return port.isAvailable();
      });
    },

    _setupPorts: function(portCount) {
      var self = this;
      this.ports = _.times(portCount, function(i) {
        return new NetSim.Port(self);
      });
    }

  });
})();