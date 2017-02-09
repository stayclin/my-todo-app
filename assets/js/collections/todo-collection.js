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

    //
    initialize: function() {
        console.log("Todo Collection initialize");
    },
    //keep track of completed
    remaining: function() {
			return this.where({status: 'active'});
		},
		completed: function() {
			return this.without.apply(this, this.remaining());
		},


  })
  //app.Todos = new app.Collections.TodoCollection();
  app.Todos = new TodoCollection();

})();
