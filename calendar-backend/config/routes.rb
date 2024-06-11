Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :show, :index]

      resources :coaches, only: [:show, :index, :create] do
        get '/appointments', to: 'appointments#appointments'
        get '/appointmentsForDate', to: 'appointments#appointments_for_date'
        post '/appointment', to: 'appointments#create'
        post '/markAppointmentComplete', to: 'appointments#transition_appointment_to_complete'
      end

      resources :students, only: [:show, :index, :create] do
        get '/appointments', to: 'appointments#available_appointments_for_date'
        post '/book_appointment', to: 'appointments#book_appointment'
      end

      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      get '/authenticated', to: 'sessions#authenticated?'
    end
  end
end
