defmodule Chatter.UserTest do
  use Chatter.ModelCase

  alias Chatter.User

  @valid_attrs %{email: "some content", firstname: "some content", lastname: "some content", password: "some content", username: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "encrypt password" do
    changeset =
      %User{}
      |> Ecto.Changeset.change(password: "hello")
      |> User.encrypt_password

    assert User.valid_password?(changeset.changes[:password_hash], "hello")
    refute User.valid_password?(changeset.changes[:password_hash], "invalid")
  end

  test "json" do
    assert "{\"username\":\"test\",\"id\":null}" == Poison.encode!(%User{username: "test"})
  end

  test "email is unique" do
    changeset =
      %User{}
      |> User.changeset(@valid_attrs)
      |> User.encrypt_password

    Repo.insert! changeset

    assert {:error, changeset} = Repo.insert(changeset)
    assert {:email, "has already been taken"} in changeset.errors
  end

  test "username is unique" do
    changeset =
      %User{}
      |> User.changeset(@valid_attrs)
      |> User.encrypt_password

    Repo.insert! changeset

    assert {:error, changeset} = Repo.insert(changeset)
    assert {:email, "has already been taken"} in changeset.errors
  end
end
