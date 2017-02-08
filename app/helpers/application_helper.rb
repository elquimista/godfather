module ApplicationHelper
  def js_route
    action_name = controller.action_name
    controller_name = controller.class.name.underscore.gsub('_controller', '')
    "#{controller_name}/#{action_name}"
  end

  def image_paths
    Dir.glob('app/assets/images/*').reduce({}) do |acc, file|
      file_name = file.split('/').last
      acc.merge file_name => image_path(file_name)
    end
  end
end
