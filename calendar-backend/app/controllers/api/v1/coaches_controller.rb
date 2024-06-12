class Api::V1::CoachesController < ApplicationController
  def show
    coach = Coach.find_by(id: params[:coach_id])
    render json: {
      coach: coach
    }
  end

  def index
    coaches = Coach.all
    if coaches
      render json: {
        coaches: coaches
      }
    else 
      render json: {
        status: 500,
        errors: ['no coaches found']
      }
    end
  end

  def create
    coach = Coach.new(coach_params)
    if coach.save
      login
      render json: {
          status: :created,
          coach: coach
      }
    else
      render json: {
          status: 500,
          errors: coach.errors.full_messages
      }
    end
  end

  def appointmentsForCoach
    coach = Coach.find_by(id: params[:coach_id])
    coach.appointments
  end

  def addAppointmentAvailability
    start_datetime = params[:start_datetime]
    if start_datetime > DateTime.now() + 2.weeks || start_Datetime < DateTime.now() - 2.weeks
      #also check that the start_datetime is not after 4PM EST, because that's the last time for appointments
      raise StandardError.new(message: "start datetime is invalid!")
    end

    student = Student.find_by(id: params[:student_id])
    
    #move this to AppointmentsController#create
    #turn status into an Enum (also look into AASM later)
    # Appointment.create!(start_datetime: start_datetime, coach: coach, student: student, status: "Available")
  end

  private
  def coach_params
    params.require(:coach).permit(:username, :password, :password_confirmation, :phone_number, :type, :first_name, :last_name, :email)
  end
end