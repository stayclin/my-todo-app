var app = app || {};
app.Models = app.Models || {};

(function () {
  'use strict';

  app.Models.TodoModel = Backbone.Model.extend({
    // Public methods.
    // ------------------------------------------------------------------------
    // Public: Defaults.
    //
    // Returns a defaults object.
    defaults: function () {
      return {
        status: 'active'
      }
    },

    // Public: Initialize.
    //
    // Returns this.
    initialize: function () {
      this.on('change:status', function (model) {
        model.save();
      });
    },

    // Public: Toggle the status of this todo.
    //
    // Returns this.
    toggleStatus: function () {
      var status;

      status = this.get('status');

      if (status === 'active') {
        status = 'complete';
      } else if (status === 'complete') {
        status = 'active'
      }

      this.set('status', status);
      return this;
    }
  });
})();
