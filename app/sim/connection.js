NetSim.Connection =  function(network, portA, portB) {
  this.network = network;
  this.portA = portA;
  this.portB = portB;
  this.queue = [];

  this.listenTo(this.portA, "frame", _.bind(this._send, this, this.portB));
  this.listenTo(this.portB, "frame", _.bind(this._send, this, this.portA));
  this.listenTo(this.network, "tick", _.bind(this._tick, this));
};

_.extend(NetSim.Connection.prototype, Backbone.Events, {

  _send: function(destination, message) {
    this.queue.push({
      destination: destination,
      message: message
    });
  },

  _tick: function() {
    var action = this.queue.shift();
    if(action) action.destination.pushFrame(action.message);
  }

});