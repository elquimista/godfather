require 'test_helper'

class PersonTest < ActiveSupport::TestCase
  test 'invalid without full_name' do
    person = Person.new(full_name: '')
    person.validate
    assert_includes person.errors.details[:full_name], { error: :blank }
  end
end
