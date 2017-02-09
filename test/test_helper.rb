ENV['RAILS_ENV'] = 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'capybara/rails'
require 'capybara/poltergeist'
require 'mocha/mini_test'
require 'minitest/reporters'

Minitest::Reporters.use! [Minitest::Reporters::ProgressReporter.new]

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

# Configure Capybara
Capybara.configure do |config|
  config.javascript_driver = :poltergeist
  config.always_include_port = true
end

class ActionDispatch::IntegrationTest
  # include Devise::Test::IntegrationHelpers
  include Capybara::DSL
  include Capybara::Assertions

  Dir.glob('test/test_helpers/*.rb').each do |helper_file|
    constants = Object.constants
    require helper_file.split('/')[1..-1].join('/')
    (Object.constants - constants).each { |c| include Kernel.const_get(c) }
  end

  # Reset sessions and driver between tests
  # Use super wherever this method is redefined in your individual test classes
  def teardown
    Capybara.reset_sessions!
    Capybara.use_default_driver
  end
end
