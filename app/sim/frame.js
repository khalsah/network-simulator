
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
    if(!this.dstMAC || !NetSim.MacAddress.Pattern.test(this.dstMAC)) {
      throw Error("Invalid destination MAC: ", this.dstMAC);
    }

    if(!this.srcMAC || !NetSim.MacAddress.Pattern.test(this.srcMAC)) {
      throw Error("Invalid source MAC: ", this.srcMAC);
    }
  }
});