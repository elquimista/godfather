require 'test_helper'

class FamilyTreesControllerTest < ActionDispatch::IntegrationTest
  test '#index should render' do
    get root_path
    assert_response :success
  end

  test '#update should render' do
    family_tree = family_trees(:one)
    family_tree_params = { raw_data: 'lorem ipsum' }
    patch family_tree_path(family_tree, format: :json), params: { family_tree: family_tree_params }
    assert_response :success
  end

  test '#update should update family_tree record' do
    family_tree = family_trees(:one)
    family_tree_params = { raw_data: 'lorem ipsum' }
    patch family_tree_path(family_tree, format: :json), params: { family_tree: family_tree_params }
    family_tree.reload
    assert_equal family_tree_params[:raw_data], family_tree.raw_data
  end
end
