require 'sinatra'
require 'sinatra/json'
require 'json'

require 'pry'

todos = [
  {id: 1, text: 'Hello, world!', status: :active},
  {id: 2, text: 'Pick up groceries', status: :complete}
]

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

get '/todos' do
  json (todos)
  #@response = todos
  #json @response
end

get '/todos/:id' do
  #@response = todos[params[:id]]
  #json (@response)
  #binding.pry
  val = params[:id]
  puts val
  puts todos.size
  index = params[:id]
  puts "index equals #{index}"
  puts todos[Integer(index)] #works to get the index
  #json(todos[Integer(index)])

  todoval = todos.find(params[:id])
  puts todoval
  puts todos[1][:text]
  #puts todos[{@val]
  #loops through to find the id also works
  todos.each do |todo|
    puts "loop id: #{todo[:id]} and todo: #{todo[:text]}"
    puts todo[:id].to_s.inspect
    puts index.inspect
    if index == todo[:id].to_s
      puts "if index equals #{index}"
      puts "found"
      puts "if id: #{todo[:id]} and todo: #{todo[:text]}"
      return json(todo)
    else
      puts "next item"
    end
  end

end

#create
#post '/todos' do
put '/todos/' do
  puts "adding new todo"
  params = get_params(request)

  if params[:text].nil?
    halt 400, '`text` is required.'
  end

  todos << {
    #id: params[:id],
    id: todos.count + 1,    #todo.count if delete before add, index will be wrong
    text: params[:text],
    status: :active
  }
  puts "posting #{todos}"

  json todos
end

delete '/todos/:id' do
  puts "deleting"

  index = params[:id]
  todos.each do |todo|
    if index == todo[:id].to_s
      puts "if index equals #{index}"
      puts "found"
      puts "if #{todo}"
      todos.delete(todo)
      #return json(todo)
    else
      puts "next item"
    end
  end

  puts "count #{todos.size}"
  puts todos
  #halt 500, 'not implemented'
end

#update
put '/todos/:id' do
  puts "put update"
  params = get_params(request)
  puts params[:text]
  puts params[:status]
  puts params[:id]
  todos.each{|todo| todo[:status] = params[:status] if todo[:id]==params[:id]}
  todos.each{|todo| todo[:text] = params[:text] if todo[:id]==params[:id]}
  #todos.map{|todo| todo[:status]=params[:status]} #replaces all
  puts todos

  #halt 500, 'not implemented'
end

def get_params(req)
  symbolize_keys(JSON.parse(req.body.read))
end

def symbolize_keys(hash)
  hash.inject({}) {|memo,(k,v)| memo[k.to_sym] = v; memo}
end

# Special route to get requests to node_modules working... don't touch.
get /^\/node_modules/ do
  send_file File.join(request.path_info[1..-1])
end
