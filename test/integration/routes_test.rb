require 'test_helper'

class RoutesTest < ActionDispatch::IntegrationTest
  test 'root path' do
    assert_generates root_path, controller: 'family_trees', action: 'index'
  end

  test 'people resources' do
    assert_generates people_path, controller: 'people', action: 'create'
  end
end
