NetSim.Connection =  function(network, portA, portB) {
  this.network = network;
  this.portA = portA;
  this.portB = portB;
  this.queue = [];

  this.listenTo(this.portA, "transport", _.bind(this._send, this, this.portB));
  this.listenTo(this.portB, "transport", _.bind(this._send, this, this.portA));
  this.listenTo(this.network, "tick", _.bind(this._tick, this));

  this.portA.lock(this);
  this.portB.lock(this);
};

_.extend(NetSim.Connection.prototype, Backbone.Events, {

  _send: function(destination, frame) {
    this.queue.push({
      destination: destination,
      frame: frame
    });
  },

  _tick: function() {
    var action = this.queue.shift();
    if(action) action.destination.trigger("frame", action.frame);
  }

});