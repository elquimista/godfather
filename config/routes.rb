Rails.application.routes.draw do
  devise_for :users

  devise_scope :user do
    root to: 'devise/sessions#new'
  end

  authenticate :user do
    resources :family_trees, only: %i[index update]
    resources :people, only: %i[create show update destroy]
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
