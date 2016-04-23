defmodule Chatter.Router do
  use Chatter.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", Chatter do
    pipe_through :api
  end
end
