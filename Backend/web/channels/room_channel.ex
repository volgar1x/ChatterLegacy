defmodule Chatter.RoomChannel do
  use Chatter.Web, :channel
  require Logger

  def join("rooms:lobby", %{"name" => name}, socket) do
    {:ok, assign(socket, :name, name)}
  end

  def join("rooms:lobby", _, socket) do
    {:ok, assign(socket, :name, "User-#{:random.uniform(1000)}")}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (rooms:lobby).
  def handle_in("shout", payload, socket) do
    timestamp =
      Timex.DateTime.universal
      |> Timex.format!("{ISO}")

    message =
      payload
      |> Map.put("timestamp", timestamp)
      |> Map.put("author", socket.assigns.name)

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
end