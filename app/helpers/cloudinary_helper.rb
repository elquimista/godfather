module CloudinaryHelper
  def cl_small_image_path(url)
    cl_image_path_with_custom_size(url, 84, 117)
  end

  def cl_medium_image_path(url)
    cl_image_path_with_custom_size(url, 118, 128)
  end

  protected

  def cl_image_path_with_custom_size(url, width, height)
    if url.present?
      cl_image_path url.split('/').last, width: width, height: height, crop: :fill
    else
      nil
    end
  end
end
