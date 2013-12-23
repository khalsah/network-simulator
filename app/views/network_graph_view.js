App.Views.NetworkGraphView = Backbone.View.extend({
  el: '#network_graph',

  events: {
  },

  initialize: function(chassis_collection, connection_collection) {
    this.chassis_collection = chassis_collection;
    this.connection_collection = connection_collection;

    this.chassis_collection.bind('add', this.on_chassis_added, this);
    this.connection_collection.bind('add', this.on_connection_added, this);

    this.render();
  },

  render: function() {
    this.networkGraph = new NetworkGraph(el);
  }, 

  on_connection_added: function(added_connection) {
    this.networkGraph.addLink(added_connection.portA.chassis.id, added_connection.portB.chassis.id);
  },

  on_chassis_added: function(added_chassis) {
    this.networkGraph.addNode(added_chassis.chassis.id, added_chassis.name);
  }
}

