# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :chatter, Chatter.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "iHAwZyO2GyykmldsoZl5ITVjhkia++F1y0h7SCg8rHdpMRthniVGOn3714ATLLiw",
  render_errors: [accepts: ~w(json)],
  pubsub: [name: Chatter.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false

config :xain, :quote, "'"
config :xain, :after_callback, {Phoenix.HTML, :raw}

config :ex_admin,
  repo: Chatter.Repo,
  module: Chatter,
  modules: [
    Chatter.ExAdmin.Dashboard,
    Chatter.ExAdmin.User,
  ]
