NetSim.Connection =  function(network, portA, portB) {
  this.network = network;
  this.portA = portA;
  this.portB = portB;
  this.queue = [];
  this.state = "inactive";

  this.listenTo(this.portA, "transport", _.bind(this._send, this, this.portB));
  this.listenTo(this.portB, "transport", _.bind(this._send, this, this.portA));
  this.listenTo(this.network, "tick", _.bind(this._tick, this));

  this.portA.lock(this);
  this.portB.lock(this);
};

_.extend(NetSim.Connection.prototype, Backbone.Events, {

  destroy: function() {
    this.portA.unlock(this);
    this.portB.unlock(this);
    this.stopListening();
    this.trigger("destroy");
  },

  _send: function(destination, frame) {
    this.queue.push({
      destination: destination,
      frame: frame
    });
  },

  _tick: function() {
    if(this.queue.length){
      this.notify('active');
    } else {
      this.notify('innactive');
    }

    var action = this.queue.shift();

    if(action) {
      _.defer(function() {
        action.destination.trigger("frame", action.frame);
      });
    }
  },

  notify: function(message) {
    this.state = message;
    this.trigger("state", message);
  }

});
