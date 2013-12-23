NetSim.Switch = NetSim.Chassis.extend({

  constructor: function(network, portCount) {
    NetSim.Chassis.call(this, network, portCount);

    this.reset();

    var self = this;
    _.each(this.ports, function(port) {
      port.on("frame", function(frame) {
        self.process(port, frame);
      });
    });
  },

  process: function(port, frame) {
    this.addressTable[frame.srcMAC] = port;
    if(this.addressTable.hasOwnProperty(frame.dstMAC)) {
      this.addressTable[frame.dstMAC].sendFrame(frame);
    } else {
      this.broadcast(port, frame);
    }
  },

  broadcast: function(port, frame) {
    var otherPorts = _.without(this.ports, port);
    _.each(otherPorts, function(otherPort) {
      otherPort.sendFrame(frame);
    });
  },

  reset: function(){
    this.addressTable = {};
  }

});