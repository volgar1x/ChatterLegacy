defmodule Chatter.UserController do
  use Chatter.Web, :controller

  alias Chatter.User

  plug :scrub_params, "user" when action in [:create]

  def show(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render conn, :show, user: user
  end

  def create(conn, %{"user" => user_params}) do
    changeset =
      %User{}
      |> User.changeset(user_params)
      |> User.encrypt_password

    case Repo.insert(changeset) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", user_path(conn, :show, user))
        |> render(:show, user: user)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Chatter.ChangesetView, :error, changeset: changeset)
    end
  end
end
