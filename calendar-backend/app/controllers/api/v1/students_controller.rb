class StudentsController < ApplicationController
  def show
    student = Student.find_by(id: params[:student_id])
    render json: {
      student: student
    }
  end

  def index
    students = Student.all
    if students
      render json: {
        students: students
      }
    else 
      render json: {
        status: 500,
        errors: ['no students found']
      }
  end

  def create
    student = Student.new(student_params)
    if student.save
      login
      render json: {
        status: :created,
        student: student
      }
    else
      render json: {
        status: 500,
        errors: student.errors.full_messages
      }
    end
  end

  private
  def student_params
    params.require(:student).permit(:username, :password, :password_confirmation, :phone_number, :type, :first_name, :last_name, :email)
  end
end