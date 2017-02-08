class Person < ApplicationRecord
  validates :full_name, presence: true
end
