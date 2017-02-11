require 'test_helper'

class RoutesTest < ActionDispatch::IntegrationTest
  test 'root path' do
    skip
    assert_generates root_path, controller: 'devise/sessions', action: 'new'
  end

  test 'people resources' do
    assert_generates people_path, controller: 'people', action: 'create'
    assert_generates person_path(1), controller: 'people', action: 'show', id: 1
    assert_generates person_path(1), controller: 'people', action: 'update', id: 1
    assert_generates person_path(1), controller: 'people', action: 'destroy', id: 1
  end

  test 'family_trees resources' do
    assert_generates family_trees_path, controller: 'family_trees', action: 'index'
    assert_generates family_tree_path(1), controller: 'family_trees', action: 'update', id: 1
  end
end
