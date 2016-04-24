defmodule Chatter.RoomChannel do
  use Chatter.Web, :channel
  require Logger

  def join("rooms:" <> _room, _params, socket) do
    {:ok, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (rooms:lobby).
  def handle_in("shout", %{"text" => text}, socket) do
    message = %{"text" => text,
                "timestamp" => timestamp,
                "author" => socket.assigns.username}

    broadcast socket, "shout", message

    {:noreply, socket}
  end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  defp timestamp do
    Timex.DateTime.universal
    |> Timex.format!("{ISO}")
  end
end
