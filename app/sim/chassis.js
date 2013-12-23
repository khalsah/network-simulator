(function() {
  var chassisCounter = 0;

  NetSim.Chassis = function(network, portCount) {
    var self = this;
    this.id = chassisCounter++;
    this.network = network;
    this._setupPorts(portCount);
  };

  NetSim.Chassis.extend = Backbone.Model.extend;

  _.extend(NetSim.Chassis.prototype, Backbone.Events, {

    _setupPorts: function(portCount) {
      this.ports = _.times(portCount, function(i) {
        return new NetSim.Port(self);
      });
    }

  });
})();