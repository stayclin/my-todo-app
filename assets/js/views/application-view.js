var app = app || {};
app.Views = app.Views || {};

(function () {
  'use strict';

  app.Views.ApplicationView = Backbone.View.extend({
    // Public properties.
    // ------------------------------------------------------------------------
    // Public: El.
    el: document.body,

    // Public methods.
    // ------------------------------------------------------------------------
    // Public: Events.
    //
    // Returns an events object.
    events: function () {
      return {
        'click .status-bar__item': 'setFilter',
        'keyup .add-todos__input': 'submitTodo'
      }
    },

    // Public: Initialize.
    //
    // Returns this.
    initialize: function () {
      this.collection = new app.Collections.TodoCollection();
      this.listenTo(this.collection, 'sync', this.renderTodoList);
      this.collection.fetch();
      return this;
    },

    // Public: Render.
    //
    // Returns this.
    render: function () {
      this.list = this.list || this.el.querySelector('.todo-list .list');
      this.renderTodoList();
      return this;
    },

    // Public: Render the todo list.
    //
    // Returns this.
    renderTodoList: function () {
      this.list.innerHTML = '';
      this.collection.each(_.bind(this.addTodo, this));
      return this;
    },

    // Public: Create and render a todo for a todo model.
    //
    // model - Todo model.
    //
    // Returns this.
    addTodo: function (model) {
      var todo;
      todo = new app.Views.TodoView({model: model});
      this.list.appendChild(todo.render().el);
      return this;
    },

    // Public: Handle attempting to submit a todo.
    //
    // event - Event object.
    //
    // Returns this.
    submitTodo: function (event) {
      var field,
        value;

      field = event.currentTarget;
      value = field.value;

      if (value === '') {
        return this;
      }

      if (event.which !== app.ENTER) {
        return this;
      }

      this.collection.create({text: value});
      field.value = '';
      return this;
    },

    // Public: Set the selected view filter.
    //
    // event - Event object.
    //
    // Returns this.
    setFilter: function (event) {
      var status;
      status = event.currentTarget.getAttribute('data-status');
      this.collection.trigger('filter', status);

      this.el.querySelector('.status-bar__item--active')
        .classList.remove('status-bar__item--active');

      event.currentTarget.classList.add('status-bar__item--active');
      return this;
    }
  });
})();
