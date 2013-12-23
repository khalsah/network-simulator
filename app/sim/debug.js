NetSim.Debug = {
  insertFrame: function(port, frame) {
    port.trigger("frame", frame);
  },

  logFrames: function(ports) {
    _.each(ports, function(port, i) {
      port.on("transport", console.log.bind(console, "Transport", port.chassis.id, i));
    });
  }
};