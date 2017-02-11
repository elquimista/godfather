Rails.application.routes.draw do
  root to: 'family_trees#index'

  resources :people, only: %i[create show update destroy]
  resources :family_trees, only: %i[update]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
