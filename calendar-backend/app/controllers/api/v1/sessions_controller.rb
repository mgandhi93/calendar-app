class Api::V1::SessionsController < ApplicationController
  def create
    user = User.find_by(username: session_params[:username])

    if user && user.authenticate(session_params[:password])
      login
      render json: {
        logged_in: true,
        user: user,
        type: user.type
      }
    else 
      render json: {
        status: 401,
        errors: ['no such user', 'verify credentials and try again or signup']
      }
    end
  end

  def authenticated?
    if logged_in? && current_user
      render json: {
        logged_in: true,
        user: current_user,
        type: current_user.type
      }
    else
      render json: {
        logged_in: false,
        message: 'no such user'
      }
    end
  end

  def destroy
    logout
    render json: {
      status: 200,
      logged_out: true
    }
  end

  private
  def session_params
    params.require(:login).permit(:username, :password)
  end
end