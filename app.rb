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
end

get '/todos/:id' do
  #binding.pry
  index = params[:id]
  #puts todos[Integer(index)] #works to get the index

#to search based on id
  #loops through to find the id
  todos.each do |todo|
    if index == todo[:id].to_s
      return json(todo)
    end
  end
end

#create
#post '/todos' do
put '/todos/' do
  #puts "adding new todo"
  params = get_params(request)

  if params[:text].nil?
    halt 400, '`text` is required.'
  end

  todos << {
    id: params[:id],
    #id: todos.count + 1,    #todo.count if delete before add, index will conflict
    text: params[:text],
    status: :active
  }
end

#update
#update and create now
put '/todos/:id' do
  puts "put update"
  params = get_params(request)

  #todos.each{|todo| todo[:status] = params[:status] if todo[:id]==params[:id]}
  #todos.each{|todo| todo[:text] = params[:text] if todo[:id]==params[:id]}
  #todos.map{|todo| todo[:status]=params[:status]} #replaces all

  new = false
  todos.each do |todo|
    if todo[:id]==params[:id]
      puts "found exists"
      new = false
      todo[:status] = params[:status]
      todo[:text] = params[:text]
      break
    else
      puts "keep looking"
      new = true
    end
  end

puts new
if(new)
  todos << {
    id: params[:id],
    text: params[:text],
    status: :active
  }
end

end

delete '/todos/:id' do
  #puts "deleting"
  index = params[:id]
  todos.each do |todo|
    if index == todo[:id].to_s
      todos.delete(todo)
      #return json(todo)
    else
      puts "next item"
    end
  end
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
