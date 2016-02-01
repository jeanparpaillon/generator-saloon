-module('{{name}}_desc_handler').

-export([init/2
		,content_types_accepted/2
		,content_types_provided/2
		,forbidden/2
		,resource_exists/2
		,allowed_methods/2
        ,handle_get/2]).

%% trails
-behaviour(trails_handler).
-export([trails/0]).

trails() ->
	Metadata =
		#{get =>
			  #{tags => ["example"],
				description => "Retrieves trails's server description",
				produces => ["text/plain"]
			   }
		 },
	[trails:trail("/description", ?MODULE, [], Metadata)].

%% cowboy
init(Req, _Opts) ->
	{cowboy_rest, Req, #{}}.

content_types_accepted(Req, State) ->
	{[{'*', handle_put}], Req, State}.

content_types_provided(Req, State) ->
	{[{<<"text/plain">>, handle_get}], Req, State}.

forbidden(Req, State) ->
	{false, Req, State}.

resource_exists(Req, State) ->
	{true, Req, State}.

allowed_methods(Req, State) ->
	{[<<"GET">>], Req, State}.

%% internal
handle_get(Req, State) ->
	Body = trails:all(),
	{io_lib:format("~p~n", [Body]), Req, State}.
