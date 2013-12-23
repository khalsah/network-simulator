
NetSim.MacAddress = {
  Pattern: /^([0-9A-F]{2}\:){5}[0-9A-F]{2}$/,

  random: function() {
    return _.times(6,function() {
        var byte = Math.round(Math.random() * 255).toString(16);
        return byte.length === 2 ? byte : "0" + byte;
    }).join(':').toUpperCase();
  }
};