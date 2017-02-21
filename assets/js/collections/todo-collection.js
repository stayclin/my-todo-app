var app = app || {};
app.Collections = app.Collections || {};

(function () {
  'use strict';
  var TodoCollection = Backbone.Collection.extend({
  //app.Collections.TodoCollection = Backbone.Collection.extend({

    // Public properties.
    // ------------------------------------------------------------------------
    // Public: URL.
    url: '/todos',

    // Public: Model.
    model: app.Models.TodoModel,

    // Public: Initialize.
    //
    // Returns this.
    initialize: function() {
        console.log("Todo Collection initialize");
    },

    // Public: Remaining todos.
    //
    // Returns this.
    remaining: function() {
			return this.where({status: 'active'});
		},

    // Public: Completed todos.
    //
    // Returns this.
		completed: function() {
			return this.without.apply(this, this.remaining());
		},
    nextOrder: function() {
      debugger;
      console.log("order length: " + this.length);
      if (!this.length) return 1;
      console.log("last id: "+this.last().get("id"));
      return this.last().get("id") + 1;
    },
    comparator: 'id'
  });
  //app.Todos = new app.Collections.TodoCollection();
  app.Todos = new TodoCollection();

})();
