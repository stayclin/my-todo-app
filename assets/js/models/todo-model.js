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
        id:'',
        text:'empty',
        status: 'active'
      }
    },

    // Public: Initialize.
    //
    // Returns this. //set as completed
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
        status = 'active';
      }

      this.set('status', status);
      //this.save('status', status);
      //model.save();
      return this;
    },

    archive: function(){
      //debugger;
      var status;
      status = this.get('status');
      if(status==='complete'){
        status = 'archive';
        this.set('status', status);
      }else if(status==='active'){
        //return unable to archive message
        return this;
      }
      return this;
    }

  });
})();
