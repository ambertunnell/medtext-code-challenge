Rails.application.routes.draw do

  root 'doctors#index'
  get 'doctors/all'
  resources :doctors, :only => [:index]
end
