NetSim.Network = function() {
  this.chassisList = new EventedList();
  this.connectionList = new EventedList();

  this._startTicker();
};

_.extend(NetSim.Network.prototype, Backbone.Events, {
  
  _startTicker: function() {
    var interval = window.tickInterval || 500;
    this.timer = setTimeout(_.bind(this._tick, this), interval);
  },

  _tick: function() {
    this.trigger('tick');
    this._startTicker();
  },

  addChassis: function(klass, portCount) {
    var chassis = new klass(this, portCount);
    this.chassisList.add(chassis);
    return chassis;
  },

  addConnection: function(portA, portB) {
    var connection = new NetSim.Connection(this, portA, portB);
    this.connectionList.add(connection);
    return connection;
  },

  connectChassisPair: function(chassisA, chassisB){
    var portA = chassisA.availablePort();
    var portB = chassisB.availablePort();

    if (portA && portB){
      return this.addConnection(portA, portB);
    } else {
      throw Error("Not enough available ports");
    }
  }

});