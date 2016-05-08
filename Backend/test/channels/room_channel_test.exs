defmodule Chatter.RoomChannelTest do
  use Chatter.ChannelCase

  alias Chatter.User
  alias Chatter.RoomChannel

  setup do
    :ets.new(Chatter.RoomChannel.RoomPresence, [:public, :named_table, :bag])

    user =
      %User{}
      |> User.changeset(%{username: "test", firstname: "test", lastname: "test", email: "test@test", password: "test"})
      |> User.encrypt_password
      |> Repo.insert!

    {:ok, _, socket} =
      socket("user_id", %{user: user})
      |> subscribe_and_join(RoomChannel, "rooms:lobby")

    {:ok, socket: socket, user: user}
  end

  test "shout broadcasts to rooms:lobby", %{socket: socket} do
    push socket, "shout", %{"text" => "data"}
    assert_broadcast "payload", %{"text" => "data"}
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from! socket, "broadcast", %{"text" => "data"}
    assert_push "broadcast", %{"text" => "data"}
  end

  test "who", %{socket: socket, user: user} do
    ref = push socket, "who"
    users = [user]
    assert_reply ref, :ok, %{"users" => ^users}
  end
end
