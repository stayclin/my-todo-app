var app = app || {};
app.Views = app.Views || {};

(function () {
  'use strict';

  app.Views.TodoView = Backbone.View.extend({
    // Public properties.
    // ------------------------------------------------------------------------
    // Public: Class name.
    className: 'todo',

    // Public: Template.
    template: _.template($('#todo-template').html()),

    // Public methods.
    // ------------------------------------------------------------------------
    // Public: Events.
    //
    // Returns an events object.
    events: function () {
      return {
        'click': 'onClick',
        'click .todo-list__delete-item': 'onDeleteClick'
      }
    },

    // Public: Initialize.
    //
    // Returns this.
    initialize: function () {
      var _this;

      _this = this;

      this.listenTo(this.model.collection, 'filter', this.filter);

      this.listenTo(this.model, 'change:status', function (model, status) {
        _this.toggleComplete(status);
      });

      this.listenTo(this.model, 'destroy', this.remove);

      return this;
    },

    // Public: Render.
    //
    // Returns this.
    render: function () {
      this.el.innerHTML = this.template(this.model.toJSON());
      this.toggleComplete(this.model.get('status'));
      return this;
    },

    // Public: Handle clicking on a todo item.
    //
    // Returns this.
    onClick: function () {
      this.model.toggleStatus();
      return this;
    },

    // Public: Handle clicking the delete button.
    //
    // event - Event object.
    //
    // Returns this.
    onDeleteClick: function (event) {
      event.stopPropagation();
      this.model.destroy();
      return this;
    },

    // Public: Toggle the visibility of a todo item.
    //
    // filter - The currently set view filter.
    //
    // Returns this.
    filter: function (filter) {
      var show;

      show = filter === 'all' || this.model.get('status') === filter;
      this.el.classList.toggle('display-none', !show);
      return this;
    },

    // Public: Toggle the complete class name.
    //
    // status - Current model status.
    //
    // Returns this.
    toggleComplete: function (status) {
      this.el.classList
        .toggle(this.className + '--status-complete', status === 'complete');
      return this;
    }
  });
})();
