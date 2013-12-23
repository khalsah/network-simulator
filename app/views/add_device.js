NetViz.AddDevice = Backbone.View.extend({
  types: {
    'terminal': NetSim.Terminal,
    'hub': NetSim.Hub,
    'switch': NetSim.Switch
  },
  events: {
    'click input[type=submit]': 'create',
    'click #addDeviceButton': 'render'
  },
  el: '#addDevice',
  render: function(){

    var typeOptions = _.map(_.keys(this.types),function(name){
      return _.template('<option><%= name %></option>')({name: name});
    });

    this.$el.find('#deviceName').html('');
    this.$el.find('#deviceType').html(typeOptions);
    this.$el.find('form').show();
    this.$el.find('#addDeviceButton').hide();
  },

  create: function(){
    this.$el.find('form').hide();
    this.$el.find('#addDeviceButton').show();
    var type = this.$el.find('#deviceType').val();
    var ports = this.$el.find('#portCount').val();
    var name = this.$el.find('#deviceName').val();
    var chassis = window.network.addChassis(this.types[type], ports);
    chassis.name = name;

  }

});