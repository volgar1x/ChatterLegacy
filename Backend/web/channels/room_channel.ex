defmodule Chatter.RoomChannel do
  use Chatter.Web, :channel

  alias Chatter.Repo
  alias Chatter.Room

  def join("rooms:" <> room, _params, socket) do
    send self, {:after_join, room}

    {:ok, socket}
  end

  def terminate(_, socket) do
    "rooms:" <> room = socket.topic
    user_id = socket.assigns.user.id

    :ets.delete_object(Chatter.RoomChannel.RoomPresence, {room, user_id})

    broadcast socket, "who", %{
      "user_id" => user_id,
      "entering" => false}

    broadcast_and_log socket,
      %{"type" => "event",
        "timestamp" => timestamp,
        "text" => "#{socket.assigns.user.username} has left"}
  end

  def handle_info({:after_join, room}, socket) do
    user_id = socket.assigns.user.id

    :ets.insert(Chatter.RoomChannel.RoomPresence, {room, user_id})

    broadcast socket, "who", %{
      "user_id" => user_id,
      "entering" => true}

    payloads =
      from r in Room,
      where: r.name == ^room,
      order_by: [asc: r.inserted_at],
      select: r.content

    push socket, "sync", %{payloads: Repo.all(payloads)}

    broadcast_and_log socket,
      %{"type" => "event",
        "timestamp" => timestamp,
        "text" => "#{socket.assigns.user.username} has joined ##{room}"}

    {:noreply, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (rooms:lobby).
  def handle_in("shout", %{"text" => text}, socket) do
    message = %{"type" => "message",
                "text" => text,
                "timestamp" => timestamp,
                "author" => socket.assigns.user.username}

    broadcast_and_log socket, message

    {:noreply, socket}
  end

  def handle_in("who", _, socket) do
    "rooms:" <> room = socket.topic

    user_ids =
      :ets.lookup(Chatter.RoomChannel.RoomPresence, room)
      |> Enum.map(fn {^room, user_id} -> user_id end)

    users =
      from u in Chatter.User,
      where: u.id in ^user_ids,
      select: u

    {:reply, {:ok, %{"users" => Repo.all(users)}}, socket}
  end

  defp broadcast_and_log(socket, payload) do
    "rooms:" <> room = socket.topic

    Repo.insert! %Room{
      name: room,
      content: payload,
    }

    broadcast socket, "payload", payload
  end

  defp timestamp do
    Timex.DateTime.universal
    |> Timex.format!("{ISO}")
  end
end
