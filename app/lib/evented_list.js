window.EventedList = function(initial){
  this.items = _.toArray(initial);
};

_.extend(window.EventedList.prototype, Backbone.Events, {
  add: function(item){
    this.items.push(item);
    this.trigger('add', item);
    return this.item;
  },

  remove: function(item){
    this.items = _.without(this.items, item);
    this.trigger('remove', item);
    return item;
  }

});