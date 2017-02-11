require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'invalid without an email' do
    user = User.new(email: '')
    user.validate
    assert_includes user.errors.details[:email], { error: :blank }
  end

  test 'invalid without a password' do
    user = User.new(password: ' ')
    user.validate
    assert_includes user.errors.details[:password], { error: :blank }
  end

  test 'password field is not stored' do
    user = User.new
    refute user.has_attribute?(:password)
  end

  test 'password is encrypted' do
    user = User.create(password: 'guess my password')
    refute_equal user.encrypted_password, user.password
  end
end
