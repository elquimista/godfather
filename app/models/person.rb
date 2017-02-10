class Person < ApplicationRecord
  validates :full_name, presence: true

  before_save :upload_image_to_cloudinary, if: 'photo_url_changed? && photo_url.present?'
  before_destroy :destroy_cloudinary_image, if: 'photo_url.present?'

  protected

  def upload_image_to_cloudinary
    if photo_url_was.present?
      Cloudinary::Uploader.destroy photo_url_was.split('/').last.split('.').first, invalidate: true
    end
    self.photo_url = Cloudinary::Uploader.upload(photo_url)['secure_url']
  end

  def destroy_cloudinary_image
    Cloudinary::Uploader.destroy photo_url.split('/').last.split('.').first, invalidate: true
  end
end
