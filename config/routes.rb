Rails.application.routes.draw do
  root to: 'family_trees#index'

  resources :people, only: %i[create]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
