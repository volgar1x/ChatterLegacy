defmodule Chatter.UserControllerTest do
  use Chatter.ConnCase

  alias Chatter.User
  @valid_attrs %{}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  
end
