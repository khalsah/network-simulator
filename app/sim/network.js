NetSim.Network = function() {
  this.chassisCollection = new Backbone.Collection();
  this.connectionCollection = new Backbone.Collection();

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
    this.chassisCollection.add(chassis);
    return chassis;
  },

  addConnection: function(portA, portB) {
    var connection = new NetSim.Connection(this, portA, portB);
    this.connectionCollection.add(connection);
    return connection;
  }

});