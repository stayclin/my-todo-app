require 'sinatra'
require 'sinatra/json'
require 'json'

todos = [
  {id: 1, text: 'Hello, world!'},
  {id: 2, text: 'Pick up groceries', status: :complete}
]

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

get '/todos' do
  @response = todos
  json @response
end

get '/todos/:id' do
  @response = todos[params[:id]]
  json @response
end

post '/todos' do
  params = get_params(request)

  if params[:text].nil?
    halt 400, '`text` is required.'
  end

  todos << {
    id: todos.count + 1,
    text: params[:text],
    status: :active
  }

  json todos
end

delete '/todos/:id' do
  halt 500, 'not implemented'
end

put '/todos/:id' do
  halt 500, 'not implemented'
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
