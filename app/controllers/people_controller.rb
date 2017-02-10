class PeopleController < ApplicationController
  before_action :find_person, only: %i[update destroy]

  def create
    @person = Person.new(person_params)
    @person.photo_url =
      if params[:person][:photo_url].is_a? ActionDispatch::Http::UploadedFile
        params[:person][:photo_url].path
      else
        ''
      end
    @person.save
  end

  def update
    @person.assign_attributes person_params
    if params[:person][:photo_url].is_a? ActionDispatch::Http::UploadedFile
      @person.photo_url = params[:person][:photo_url].path
    end
    @person.save
    render :create
  end

  def destroy
    @person.destroy
  end

  protected

  def person_params
    params.require(:person).permit(:full_name)
  end

  def find_person
    @person ||= Person.find(params[:id])
  end
end
