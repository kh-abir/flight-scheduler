# frozen_string_literal: true

Rails.application.routes.draw do
  resources :flights
  root to: 'flights#index'
end
