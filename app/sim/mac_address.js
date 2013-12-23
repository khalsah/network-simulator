
NetSim.MacAddress = {
  Pattern: /^([0-9A-F]{2}\:){5}[0-9A-F]{2}$/,

  random: function() {
    return _.times(6,function() {
        return Math.round(Math.random() * 255).toString(16);
    }).join(':');
  }
};