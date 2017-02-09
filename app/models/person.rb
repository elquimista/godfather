class Person < ApplicationRecord
  validates :full_name, presence: true

  before_destroy :destroy_cloudinary_image

  protected

  def destroy_cloudinary_image
    if photo_url.present?
      Cloudinary::Uploader.destroy photo_url.split('/').last.split('.').first, invalidate: true
    end
  end
end
