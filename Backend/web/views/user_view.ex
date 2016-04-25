defmodule Chatter.UserView do
  use Chatter.Web, :view

  def render("show.json", %{user: user}) do
    %{"user" => user}
  end
end
