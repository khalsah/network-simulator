NetSim.Router = NetSim.Chassis.extent({

  initialize: function(network, portCount){
    this.macAddress = NetSim.MacAddress.random();
    console.log(this.id, this.macAddress);

    //listenForTraffic => processFrame
    //listenForPortState: 
    //  up => sendHello
    //  down => removeRoute

  },

  type: 'router',

  sendHello: function(srcPort){},

  addRoute: function(srcPort, type, network, hops){

  },

  removeRoute: function(srcPort, network){

  },

  addressPort: function(port, address, mask){

  },

  unaddressPort: function(port){},

  processFrame: function(srcPort, frame){},

  process: function(srcPort, packet){},

  recvPacket: function(packet){},

  route: function(){},

  routingError: function(){},

  addGateway: function(){},




});