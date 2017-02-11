class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :registerable, :confirmable,
  # :confirmable, :trackable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable
end
