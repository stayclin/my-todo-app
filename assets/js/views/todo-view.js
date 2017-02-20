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
        //'click': 'onClick',
        'click .toggle'   : 'onClick', //for checkbox toggle status
        'dblclick .view'  : 'edit', //to edit
        'keypress .edit'  : 'updateOnEnter',
			  'blur .edit'      : 'close',
        'click .todo-list__delete-item': 'onDeleteClick',
        'click .todo-list__archive-item': 'onArchiveClick'
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
      //Our view object is now listening for changes on the model object,
      //and when it does indeed change, we’re calling the render function again, which updates the view.
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      //this.listenTo(this.model, 'sync', this.render);

      return this;
    },

    // Public: Render.
    //
    // Returns this.
    render: function () {
      //this.delegateEvents();

      this.el.innerHTML = this.template(this.model.toJSON());
      //this.el.html(this.template(this.model.toJSON()); //doesn't display list
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

    // Public: Handle clicking the archive button.
    //
    // event - Event object.
    //
    // Returns this.
    onArchiveClick: function(event){
      event.stopPropagation();
      this.model.archive(); //want to remove from view but keep in collection
      return this;

    },

    // Public: Handle double clicking todo item text to edit.
    //
    // Returns this.
    edit: function() {
      event.currentTarget.classList.add("editing");
      this.$(".edit").focus();
      return this;
    },

    // Public: Handle editing the todo item on enter.
    //
    // event - Event object.
    //
    // Returns this.
    updateOnEnter: function(event) {
      event.stopPropagation();
      if (event.keyCode != 13) return;
      if (!this.$(".edit").val()) return;
      this.close();
    },

    // Public: Handle submiting the todo item edit.
    //
    // Returns this.
    close: function() {
      var value = this.$(".edit").val();
      if (!value) {
        this.clear();
      } else {
        this.model.save({text: value});
        this.$el.removeClass("editing");
      }
      return this;
    },

    // Public: Toggle the visibility of a todo item.
    //
    // filter - The currently set view filter.
    //
    // Returns this.
    filter: function (filter) {
      var show;
      show = filter === 'all' || filter === this.model.get('status')  ;

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
      this.el.classList
        .toggle(this.className + '--status-archive', status === 'archive');
      this.el.classList
        .toggle(this.className + '--status-active', status === 'active');

      return this;
    }
  });
})();
