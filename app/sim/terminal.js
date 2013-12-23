NetSim.Terminal = NetSim.Chassis.extend({
  constructor: function(network){
    NetSim.Chassis.call(this, network, 1);
    this.port = this.ports[0];
    this.macAddress = NetSim.MacAddress.random();
    console.log(this.id, this.macAddress);
    this.listenTo(this.port, "frame", _.bind(this.recvFrame, this));
  },

  type: 'terminal',

  sendFrame: function(payload, dstMAC) {
    var frame = new NetSim.Frame({
      srcMAC: this.macAddress,
      dstMAC: dstMAC,
      payload: payload
    });

    this.port.sendFrame(frame);
  },

  recvFrame: function(frame) {
    if(frame.dstMAC !== this.macAddress) {
      this.notify("Filtered frame");
    } else {
      this.notify("Received: " + frame.payload);
    }
  }
});