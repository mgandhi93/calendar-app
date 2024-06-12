class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true
  validates :username, uniqueness: true
  validates :username, length: { minimum: 4 }
  validates :email, presence: true
  validates :email, uniqueness: true

  # def as_json(*)
  #   previous = super
  #   previous[:type] = type
  #   previous
  # end
end