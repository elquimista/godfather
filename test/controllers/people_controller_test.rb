require 'test_helper'

class PeopleControllerTest < ActionDispatch::IntegrationTest
  test '#create should render' do
    uploaded_file = [fixture_file_upload('files/profile_photo.png', 'image/png'), ''].sample
    person_params = { full_name: Faker::Internet.name, photo_url: uploaded_file }
    Cloudinary::Uploader.expects(:upload).returns 'secure_url' => Faker::Internet.url if uploaded_file.present?
    post people_path(format: :json), params: { person: person_params }
    assert_response :success
  end

  test '#create should create a person' do
    assert_difference 'Person.count', +1 do
      uploaded_file = [fixture_file_upload('files/profile_photo.png', 'image/png'), ''].sample
      person_params = { full_name: Faker::Internet.name, photo_url: uploaded_file }
      Cloudinary::Uploader.expects(:upload).returns 'secure_url' => Faker::Internet.url if uploaded_file.present?
      post people_path(format: :json), params: { person: person_params }
    end
  end

  test '#show should render person data' do
    person = people(:don)
    get person_path(person, format: :json)
    assert_response :success
    assert_equal person.full_name, JSON.parse(@response.body)['person']['full_name']
  end

  test '#update should render' do
    person = people(:don)
    uploaded_file = [fixture_file_upload('files/profile_photo.png', 'image/png'), ''].sample
    person_params = { full_name: Faker::Internet.name, photo_url: uploaded_file }
    if uploaded_file.present?
      Cloudinary::Uploader.expects :destroy
      Cloudinary::Uploader.expects(:upload).returns 'secure_url' => Faker::Internet.url
    end
    patch person_path(person, format: :json), params: { person: person_params }
    assert_response :success
  end

  test '#update should update person' do
    person = people(:don)
    uploaded_file = [fixture_file_upload('files/profile_photo.png', 'image/png'), ''].sample
    person_params = { full_name: Faker::Internet.name, photo_url: uploaded_file }
    new_photo_url = Faker::Internet.url
    if uploaded_file.present?
      Cloudinary::Uploader.expects :destroy
      Cloudinary::Uploader.expects(:upload).returns 'secure_url' => new_photo_url
    end
    patch person_path(person, format: :json), params: { person: person_params }
    person.reload
    assert_equal person_params[:full_name], person.full_name
    assert_equal new_photo_url, person.photo_url if uploaded_file.present?
  end

  test '#destroy should render' do
    person = people(:don)
    delete person_path(person, format: :json)
    assert_response :success
  end

  test '#destroy should destroy' do
    assert_difference 'Person.count', -1 { delete person_path(people(:don), format: :json) }
  end
end
