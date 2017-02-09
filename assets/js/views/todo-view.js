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
      this.listenTo(this.model, 'change', this.render);

      this.listenTo(this.model, 'destroy', this.remove);

      return this;
    },

    // Public: Render.
    //
    // Returns this.
    render: function () {
      this.el.innerHTML = this.template(this.model.toJSON());
      //this.el.html(this.template(this.model.toJSON());

      this.toggleComplete(this.model.get('status'));
      return this;
    },

    // Public: Handle clicking on a todo item.
    //
    // Returns this.
    onClick: function () {
      this.model.toggleStatus();
      //this.model.toggle();


      return this;
    },

    // Public: Handle clicking the delete button.
    //
    // event - Event object.
    //
    // Returns this.
    onDeleteClick: function (event) {
      //debugger;
      event.stopPropagation();
      this.model.destroy();
      return this;
    },

    //archive
    onArchiveClick: function(event){
      //debugger;
      event.stopPropagation();
      this.model.archive(); //want to remove from view but keep
      return this;

    },

    //edit on doubleClick
    edit: function() {
      debugger;
      //this.$el.addClass("editing");
      //this.el.classList.add("editing");
      event.currentTarget.classList.add("editing");
      this.$(".edit").focus();
    },
    updateOnEnter: function(event) {
      event.stopPropagation();

      if (event.keyCode != 13) return;
      if (!this.$(".edit").val()) return;
      debugger;
      //this.$(".edit").close();
      this.close();

    },
    close: function() {
      debugger;
      var value = this.$(".edit").val();
      if (!value) {
        this.clear();
      } else {
        this.model.save({text: value});
        this.$el.removeClass("editing");
      }
    },

    // Public: Toggle the visibility of a todo item.
    //
    // filter - The currently set view filter.
    //
    // Returns this.
    filter: function (filter) {
      debugger;
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
