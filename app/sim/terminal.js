NetSim.Terminal = NetSim.Chassis.extend({
  constructor: function(network){
    NetSim.Chassis.call(this, network, 1);
    this.macAddress = NetSim.MacAddress.random();
  },
  type: 'terminal'
});