defmodule Chatter.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :password, :string
      add :username, :string
      add :firstname, :string
      add :lastname, :string

      timestamps
    end

  end
end
