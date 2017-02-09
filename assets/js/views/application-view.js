var app = app || {};
app.Views = app.Views || {};

(function () {
  'use strict';

  app.Views.ApplicationView = Backbone.View.extend({
    // Public properties.
    // ------------------------------------------------------------------------
    // Public: El.
    el: document.body,

    // Public: Template.
    // For status bar
    statsTemplate: _.template($("#stats-template").html()),

    // Public methods.
    // ------------------------------------------------------------------------
    // Public: Events.
    //
    // Returns an events object.
    events: function () {
      return {
        'click .status-bar__item': 'setFilter',
        'keypress .add-todos__input': 'submitTodo',
        'click #clear-completed': 'clearCompleted',
        'click #complete-all': 'completeAll',
        'click #archive-completed': 'archiveCompleted'

      }
    },

    // Public: Initialize.
    //
    // Returns this.
    initialize: function () {
      this.collection = app.Todos;
      //this.collection = new TodoCollection();
      //this.collection = new app.Collections.TodoCollection();

      //this.collection.on("add", this.render, this);
      this.listenTo(this.collection, 'add', this.addTodo);
      //this.listenTo(this.collection, 'add', this.render);
      this.listenTo(this.collection, 'sync', this.renderTodoList);
      //this.listenTo(this.collection, 'reset', this.renderTodoList);
      //this.listenTo(this.collection, 'all', this.render); //to update each change //removed for filtering to work

      this.collection.fetch();
      return this;
    },

    // Public: Render.
    //
    // Returns this.
    render: function () {
      //debugger;
      this.list = this.list || this.el.querySelector('.todo-list .list');
      this.renderTodoList();

      return this;
    },

    // Public: Render the todo list.
    //
    // Returns this.
    renderTodoList: function () {     //add all
      this.list.innerHTML = '';
      this.collection.each(_.bind(this.addTodo, this));
      //this.collection.each(this.addTodo, this);

      console.log("render collection length: " + this.collection.length);
      var completed = app.Todos.completed().length;
      var remaining = app.Todos.remaining().length;
      //var completed = this.collection.completed().length;
      //var remaining = this.collection.remaining().length;
      console.log("remaining: " + remaining);
      this.$("#tasks-remaining").html(this.statsTemplate({completed: completed, remaining: remaining}));

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
      //this.list.append(todo.render().el);
      return this;
    },

    // Public: Handle attempting to submit a todo.
    //
    // event - Event object.
    //
    // Returns this.
    submitTodo: function (event) {
      event.stopPropagation();

      if (event.keyCode != 13) return;
      if (!this.$(".add-todos__input").val()) return;

      var field,
        value;
      field = event.currentTarget;
      value = field.value;

      console.log(this.$(".add-todos__input").val());
      console.log("uid: " +_.uniqueId());
      /*if (value === '') {
        return this;
      }
      if (event.which !== app.ENTER) {
        return this;
      }*/
      var uid = _.uniqueId();
      //this.collection.create({id: _.uniqueId(), text: value});
      //this.collection.add({id: uid, text: value});
      //this.collection.create({id: uid, text: value}); //doesn't call ruby put create new
      this.collection.create({text: value});

      field.value = '';
      //this.$(".add-todos__input").val("");

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
    },

    //clear all completed
    clearCompleted: function() {
			_.invoke(app.Todos.completed(), "destroy");
			return false;
		},
    //complete all active
    completeAll: function() {
      _.invoke(app.Todos.remaining(), "toggleStatus");
      //var done = this.allCheckbox.checked;
      //app.Todos.each(function (todo) { todo.save({status: 'complete'}); }); works
      return false;
    },
    //archive all completed
    archiveCompleted: function() {
      _.invoke(app.Todos.completed(), "archive");
      return false;

    }
  });
})();
