MyView = Backbone.View.extend({
  initialize: function() {
    this.collection.bind('add', this.onModelAdded, this);
  },

  ...other view functions

  onModelAdded: function(addedModel) {
    //do something
  }
}
