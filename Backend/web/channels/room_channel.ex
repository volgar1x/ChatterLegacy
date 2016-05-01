defmodule Chatter.RoomChannel do
  use Chatter.Web, :channel

  alias Chatter.Repo
  alias Chatter.Room

  def join("rooms:" <> room, _params, socket) do
    send self, {:after_join, room}

    {:ok, socket}
  end

  def terminate({:shutdown, :left}, socket) do
    broadcast_and_log socket, "event",
      %{"timestamp" => timestamp,
        "text" => "#{socket.assigns.user.username} has left"}
  end

  def terminate(_, socket) do
    broadcast_and_log socket, "event",
      %{"timestamp" => timestamp,
        "text" => "#{socket.assigns.user.username} disconnected"}
  end

  def handle_info({:after_join, room}, socket) do
    past_logs =
      from r in Room,
      where: r.name == ^room,
      order_by: [asc: r.inserted_at],
      select: r.content

    push socket, "sync", %{past_logs: Repo.all(past_logs)}

    broadcast_and_log socket, "event",
      %{"timestamp" => timestamp,
        "text" => "#{socket.assigns.user.username} has joined ##{room}"}

    {:noreply, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (rooms:lobby).
  def handle_in("shout", %{"text" => text}, socket) do
    message = %{"text" => text,
                "timestamp" => timestamp,
                "author" => socket.assigns.user.username}

    broadcast_and_log socket, "shout", message

    {:noreply, socket}
  end

  defp broadcast_and_log(socket, type, payload) do
    "rooms:" <> room = socket.topic

    Repo.insert! %Room{
      name: room,
      content: %{"type" => type, "payload" => payload},
    }

    broadcast socket, type, payload
  end

  defp timestamp do
    Timex.DateTime.universal
    |> Timex.format!("{ISO}")
  end
end
