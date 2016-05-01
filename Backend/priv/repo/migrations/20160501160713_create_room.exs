defmodule Chatter.Repo.Migrations.CreateRoom do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :name, :string
      add :content, :map

      timestamps
    end

  end
end
