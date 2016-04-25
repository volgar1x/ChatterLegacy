defmodule Chatter.Router do
  use Chatter.Web, :router
  use ExAdmin.Router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/admin", ExAdmin do
    pipe_through :browser
    admin_routes
  end

  scope "/api", Chatter do
    pipe_through :api
  end
end
