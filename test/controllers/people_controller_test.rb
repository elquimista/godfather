require 'test_helper'

class PeopleControllerTest < ActionDispatch::IntegrationTest
  test '#create should render' do
    uploaded_file = fixture_file_upload('files/profile_photo.png', 'image/png')
    person_params = { full_name: Faker::Internet.name, photo_url: uploaded_file }
    Cloudinary::Uploader.expects(:upload).returns 'secure_url' => Faker::Internet.url
    post people_path(format: :json), params: { person: person_params }
    assert_response :success
  end

  test '#create should render with blank file' do
    person_params = { full_name: Faker::Internet.name, photo_url: '' }
    post people_path(format: :json), params: { person: person_params }
    assert_response :success
  end
end
