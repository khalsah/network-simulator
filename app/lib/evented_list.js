window.EventedList = function(initial){
  this.items = _.toArray(initial);
};

_.extend(window.EventedList.prototype, Backbone.Events, {
  add: function(item){
    this.items.push(item);
    this.trigger('add', item);
    this.listenTo(item, 'destroy', _.bind(this.remove, this, item));
    this.listenTo(item, 'all', _.bind(this.trigger, this));
    return this.item;
  },

  remove: function(item){
    this.items = _.without(this.items, item);
    this.trigger('remove', item);
    this.stopListening(item);
    return item;
  }

});
