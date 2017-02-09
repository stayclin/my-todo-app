var app = app || {};
app.Collections = app.Collections || {};

(function () {
  'use strict';

  app.Collections.TodoCollection = Backbone.Collection.extend({
    // Public properties.
    // ------------------------------------------------------------------------
    // Public: URL.
    url: '/todos',

    // Public: Model.
    model: app.Models.TodoModel
  })
})();
