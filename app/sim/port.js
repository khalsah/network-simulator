NetSim.Port = function(chassis) {
  this.chassis = chassis;
};

_.extend(NetSim.Port.prototype, Backbone.Events, {

  sendFrame: function(frame) {
    this.trigger("transport", frame);
  },

  lock: function(connection) {
    if(this.lockedBy) throw Error("Port already in use");
    this.lockedBy = connection;
  },

  unlock: function(connection) {
    if(this.lockedBy !== connection) throw Error("Not connected");
    this.lockedBy = undefined;
  },

  isLocked: function() {
    return !!this.lockedBy;
  },

  isAvailable: function() {
    return !this.isLocked();
  }

});