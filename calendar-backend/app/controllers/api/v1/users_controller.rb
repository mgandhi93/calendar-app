class Api::V1::UsersController < ApplicationController
    def show
        @user = User.find_by(id: params[:id])
        if @user
            render json: {
                user: @user
            }
        else
            render json: {
                status: 500,
                errors: ['user not found']
            }
        end
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login
            render json: {
                status: :created,
                user: @user,
                type: @user.type
            }
        else
            render json: {
                status: 500,
                errors: @user.errors.full_messages
            }
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation, :first_name, :last_name, :phone_number, :type)
    end
end