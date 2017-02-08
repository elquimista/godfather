require 'react_on_rails/assets_precompile'

Rake::Task['react_on_rails:assets:webpack'].clear

namespace :react_on_rails do
  namespace :assets do
    task webpack: :environment do
      if ReactOnRails.configuration.npm_build_production_command.present?
        sh "cd app/assets/webpack && #{ReactOnRails.configuration.npm_build_production_command}"
      end
    end
  end
end
