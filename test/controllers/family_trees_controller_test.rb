require 'test_helper'

class FamilyTreesControllerTest < ActionDispatch::IntegrationTest
  test '#index should render' do
    get root_path
    assert_response :success
  end
end
