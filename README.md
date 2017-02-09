# MyTodos

### Getting started.

First, make sure you have Ruby, Bundler, Node, and npm installed. You'll also want to install the Grunt CLI utility.

`npm install -g grunt-cli`

Then, install project dependencies:

`bundle`  
`npm install`  

Once the dependencies are installed, you can start the server, and the development watch process all at the same time:

`bundle exec foreman start`

### Structure

The front end client assets are in the `assets` directory, but the watch and build process will compile and copy them into the `public` directory, which are the assets that the application requests.

We're using Grunt to handle these tasks, you can see everything that's happening in `Gruntfile.js`, but understanding how it works is not strictly required.

The `Procfile` has everything you need to develop the site locally, so you can take a closer look at that to get a better understanding of what's happening.

### Requirements

This application has two parts, a server, and a client. The server has a few CRUD endpoints that respond with JSON, but some of them have some show stopping bugs, and some of them aren't implemented. You'll need to hunt down and fix the bugs, and implement the missing server functionality in order to arrive at a fully functional client. The server itself is implemented with [Sinatra](http://www.sinatrarb.com/), and the todos are stored in memory. We did this for simplicity, and there's no need to make this more complex than that.

The client is mostly functional, but lacking a few features you'll find in the [design spec](https://github.com/giantmachines/todo-app/blob/master/todo.png). The first is the summary bar, above the todo input. This bar should summarize how many active tasks you have remaining, and a button to complete all active tasks. There are no specifications for when all tasks are completed, so I'll leave that to your judgement.

Second, we'd like to introduce an archive feature for todos. This should exist alongside the delete feature, but gives the users a way to clear their completed tasks without deleting them. One major aspect of this feature is that you can only archive completed tasks. There are no specifications for what an archived task looks like or how it behaves, so I'll leave that to your judgement.

The client is implemented in [Backbone](http://backbonejs.org/), and [Sass](http://sass-lang.com/) for styling. There's a handful of established patterns, so even if you're not familiar with Backbone, you should be able to follow along. You’re more than welcome to use the documentation and whatever other resources you can.

However, other than styling the client, implementing the new features, and fixing up the server, there aren't any hard requirements. You're welcome to approach this problem however you'd like.

Want to write this client in React? Go for it! Want to throw out Sinatra and implement the server in Go? Be my guest!
