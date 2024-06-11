class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token

    helper_method :login, :logged_in?, :current_user, :authorized_user?, :logout # might not need to declare these as helper methods

    def login
        session[:current_user_id] = @user.id
    end

    def logged_in?
        !!session[:current_user_id]
    end

    def current_user
        @current_user ||= User.find_by(id: session[:current_user_id]) if session[:current_user_id]
    end

    def authorized_user?
        @user == current_user
    end

    def logout
        session.clear
    end

end
