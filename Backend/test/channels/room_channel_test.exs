defmodule Chatter.RoomChannelTest do
  use Chatter.ChannelCase

  alias Chatter.User
  alias Chatter.RoomChannel

  setup_all do
    user =
      %User{}
      |> User.changeset(%{username: "test", firstname: "test", lastname: "test", email: "test@test", password: "test"})
      |> User.encrypt_password
      |> Repo.insert!

    {:ok, user: user}
  end

  setup %{user: user} do
    {:ok, _, socket} =
      socket("user_id", %{user: user})
      |> subscribe_and_join(RoomChannel, "rooms:lobby")

    {:ok, socket: socket}
  end

  test "shout broadcasts to rooms:lobby", %{socket: socket} do
    push socket, "shout", %{"text" => "data"}
    assert_broadcast "payload", %{"text" => "data"}
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from! socket, "broadcast", %{"text" => "data"}
    assert_push "broadcast", %{"text" => "data"}
  end

  test "who", %{socket: socket} do
    ref = push socket, "who"
    assert_reply ref, :ok, %{"users" => [%{username: "test"}]}
    assert [{"lobby", _}] = :ets.lookup(Chatter.RoomChannel.RoomPresence, "lobby")
  end
end
