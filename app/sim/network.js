NetSim.Network = function() {
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
  }

});