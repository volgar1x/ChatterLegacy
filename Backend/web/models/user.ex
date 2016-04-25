defmodule Chatter.User do
  use Chatter.Web, :model

  schema "users" do
    field :email, :string
    field :old_password, :string, virtual: true
    field :password, :string, virtual: true
    field :password_hash, :string
    field :username, :string
    field :firstname, :string
    field :lastname, :string

    timestamps
  end

  @required_fields ~w(email password username firstname lastname)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def update_password(user, params) do
    user
    |> cast(params, ~w(password old_password))
    |> validate_password(:old_password)
    |> validate_length(:password, min: 6)
    |> encrypt_password
  end

  def encrypt_password(model) do
    seed = SecureRandom.base64(128)

    result = case fetch_change(model, :password) do
      {:ok, password} -> hash([seed, hash(password), seed])
    end

    force_change(model, :password_hash, seed <> "%" <> result)
  end

  def valid_password?(password_hash, password) when is_binary(password_hash) do
    [seed, hash] = String.split(password_hash, "%")
    hash == hash([seed, hash(password), seed])
  end

  def valid_password?(model, password) do
    valid_password?(model.password_hash, password)
  end

  def authenticate(email, password) do
    case Repo.get_by(__MODULE__, email: email) do
      nil -> :error

      user ->
        if valid_password?(user, password) do
          {:ok, user}
        else
          :error
        end
    end
  end

  def validate_password(changeset, field) do
    case fetch_change(changeset, field) do
      {:ok, password} ->
        if valid_password?(changeset.model, password) do
          changeset
        else
          changeset
          |> add_error(field, "does not match your current password")
        end

      :error ->
        changeset
    end
  end

  defp hash(val) do
    :crypto.hash(:sha256, val)
    |> Base.encode16
  end
end
