-module('{{name}}_echo_handler').

%% cowboy REST callbacks
-export([init/2
		,content_types_accepted/2
		,content_types_provided/2
		,resource_exists/2
		,allowed_methods/2
		,handle_put/2
		,handle_get/2]).

%% trails callback
-behaviour(trails_handler).
-export([trails/0]).

trails() ->
	Metadata =
		#{get =>
			  #{tags => ["echo"],
				description => "Gets echo var from the server",
				produces => ["text/plain"]
			   },
		  put =>
			  #{tags => ["echo"],
				description => "Sets echo var in the server",
				produces => ["text/plain"],
				parameters => [
							   #{name => <<"echo">>,
								 description => <<"Echo message">>,
								 in => <<"path">>,
								 required => false,
								 type => <<"string">>}
							  ]
			   }
		 },
	[trails:trail("/message/[:echo]", ?MODULE, [], Metadata)].

%% cowboy
init(Req, _Opts) ->
	{cowboy_rest, Req, #{}}.

content_types_accepted(Req, State) ->
	{[{'*', handle_put}], Req, State}.

content_types_provided(Req, State) ->
	{[{<<"text/plain">>, handle_get}], Req, State}.

resource_exists(Req, State) ->
	{true, Req, State}.

%% cowboy
allowed_methods(Req, State) ->
	{[<<"GET">>, <<"PUT">>, <<"HEAD">>], Req, State}.

%% internal
handle_get(Req, State) ->
	Echo = application:get_env({{name}}, echo, ""),
	Body = [<<"You Get an echo!">> , Echo],
	{Body, Req, State}.

handle_put(Req, State) ->
	Echo = cowboy_req:binding(echo, Req, ""),
	application:set_env({{name}}, echo, Echo),
	Body = [<<"You put an echo! ">> , Echo],
	Req2 = cowboy_req:set_resp_body(Body, Req),
	{true, Req2, State}.
