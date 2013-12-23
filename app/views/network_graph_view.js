NetViz.NetworkGraphView = Backbone.View.extend({
  el: '#network_graph',

  events: {
  },

  initialize: function(chassis_collection, connection_collection) {
    this.chassis_collection = chassis_collection;
    this.connection_collection = connection_collection;

    this.chassis_collection.bind('add', this.on_chassis_added, this);
    this.chassis_collection.bind('remove', this.on_chassis_removed, this);
    this.connection_collection.bind('add', this.on_connection_added, this);
    this.connection_collection.bind('remove', this.on_connection_removed, this);

    this.connection_collection.bind('state', this.on_connection_state_change, this);
    this.addDevice = new NetViz.AddDevice();
    this.render();
  },

  render: function() {
    this.networkGraph = new NetworkGraph(this.el);
    this.listenTo(this.networkGraph, "all", _.bind(this.trigger, this));
  },

  on_connection_added: function(added_connection) {
    this.networkGraph.addLink(added_connection.portA.chassis.id, added_connection.portB.chassis.id, added_connection);
  },

  on_connection_removed: function(connection) {
    this.networkGraph.removeLink(connection);
  },

  on_chassis_added: function(added_chassis) {
    this.networkGraph.addNode(added_chassis.id, added_chassis.name, added_chassis);
  },

  on_chassis_removed: function(chassis) {
    this.networkGraph.removeNode(chassis.id);
  },

  on_connection_state_change: function(changed_connection) {
    this.networkGraph.update();
  }
});
