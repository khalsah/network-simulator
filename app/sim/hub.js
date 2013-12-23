NetSim.Hub = NetSim.Chassis.extend({

  constructor: function(network, portCount) {
    NetSim.Chassis.call(this, network, portCount);

    var self = this;
    _.each(this.ports, function(port) {
      var otherPorts = _.without(self.ports, port);
      console.log(port, otherPorts);
      port.on("frame", function(frame) {
        console.log("got frame");
        _.each(otherPorts, function(otherPort) {
          otherPort.sendFrame(frame);
        });
      });
    });
  }

});