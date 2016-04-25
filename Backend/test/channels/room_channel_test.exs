defmodule Chatter.RoomChannelTest do
  use Chatter.ChannelCase

  alias Chatter.RoomChannel

  setup do
    {:ok, _, socket} =
      socket("user_id", %{username: "test"})
      |> subscribe_and_join(RoomChannel, "rooms:lobby")

    {:ok, socket: socket}
  end

  test "shout broadcasts to rooms:lobby", %{socket: socket} do
    push socket, "shout", %{"text" => "data"}
    assert_broadcast "shout", %{"text" => "data"}
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from! socket, "broadcast", %{"text" => "data"}
    assert_push "broadcast", %{"text" => "data"}
  end
end
