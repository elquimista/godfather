module CloudinaryHelper
  def cl_small_image_path(url)
    if url.present?
      cl_image_path url.split('/').last, width: 94, height: 117, crop: :fill
    else
      nil
    end
  end
end
