class PeopleController < ApplicationController
  def create
    @person = Person.new(person_params)
    @person.photo_url =
      if params[:person][:photo_url].is_a? ActionDispatch::Http::UploadedFile
        Cloudinary::Uploader.upload(params[:person][:photo_url].path)['secure_url']
      else
        nil
      end
    @person.save
  end

  protected

  def person_params
    params.require(:person).permit(:full_name)
  end
end
