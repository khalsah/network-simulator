NetSim.MacAddress = /^([0-9A-F]{2}\:){5}[0-9A-F]{2}$/;

NetSim.Frame = function(data){
  this.dstMAC = data.dstMAC.toUpperCase();
  this.srcMAC = data.srcMAC.toUpperCase();
  this.payload = data.payload;

  this.validate();
};

_.extend(NetSim.Frame.prototype, {
  toJSON: function() {
    return _.pick(this, "dstMAC", "srcMAC", "payload");
  },

  validate: function() {
    if(!this.dstMAC || !NetSim.MacAddress.test(this.dstMAC)) {
      throw Error("Invalid destination MAC");
    }

    if(!this.srcMAC || !NetSim.MacAddress.test(this.srcMAC)) {
      throw Error("Invalid source MAC");
    }
  }
});