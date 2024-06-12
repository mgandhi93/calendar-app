class Api::V1::AppointmentsController < ApplicationController
  def appointments
    coach = Coach.find_by(id: params[:coach_id])
    if coach
      render json: {
        coach: coach,
        appointments: coach.appointments
      }
    else
      render json: {
        status: 500,
        error: "Coach or appointments not found"
      }
    end
  end

  def transition_appointment_to_complete
    appointment = Appointment.find_by(id: appointment_params[:id])
    if appointment && appointment.status == "Booked" && appointment.start_datetime < DateTime.now()
      appointment.status = "Complete"
      appointment.save

      if appointment.errors.empty?
        render json: {
          appointment: appointment
        }
      else 
        render json: {
          status: 500,
          errors: [appointment.errors.full_messages]
        }
      end
    else
      render json: {
        status: 500,
        errors: [appointment.errors.full_messages]
      }
    end
  end

  def available_appointments_for_date
    student = Student.find_by(id: params[:student_id])
    date = params[:date][:date].to_date
    if student
      render json: {
        appointments: Appointment.all_available_appts_for_date(date).as_json(include: [:coach, :student])
      }
    else
      render json: {
        status: 500,
        error: "Student or appointments not found"
      }
    end
  end

  def create
    @appointment = Appointment.new(appointment_params)
    if @appointment.save
      render json: {
        appointment: @appointment
      }
    else
      render json: {
        status: 500,
        errors: @appointment.errors.full_messages
      }
    end
  end

  def set_notes
    appointment = Appointment.find_by(id: appointment_params[:id].to_s)
    if appointment
      appointment.notes = appointment_params[:notes]
      if appointment.save
        render json: {
          appointment: appointment
        }
      else
        render json: {
          status: 500,
          errors: [appointment.errors.full_messages]
        }
      end
    else
      render json: {
        status: 500,
        errors: [appointment.errors.full_messages]
      }
    end
  end

  def booked_appointments_for_date
    student = Student.find_by(id: params[:student_id])
    date = params[:date][:date].to_date
    if student
      render json: {
        appointments: Appointment.all_booked_appts_for_date(date).as_json(include: [:coach, :student])
      }
    else
      render json: {
        status: 500,
        error: "Student or appointments not found"
      }
    end
  end

  def set_student_satisfaction_score
    appointment = Appointment.find_by(id: appointment_params[:id].to_s)
    if appointment
      appointment.student_satisfaction_score = appointment_params[:student_satisfaction_score].to_i
      if appointment.save
        render json: {
          appointment: appointment
        }
      else
        render json: {
          status: 500,
          errors: [appointment.errors.full_messages]
        }
      end
    else
      render json: {
        status: 500,
        errors: [appointment.errors.full_messages]
      }
    end
  end

  def appointments_for_date
    appointments = Appointment.all_appts_for_coach(Coach.find_by(id: params[:coach_id])).all_appts_for_date(params[:date])
    render json: {
      appointments: appointments.as_json(include: [:coach, :student])
    }
  end

  def book_appointment
    appt = Appointment.find_by(id: appointment_params[:id])
    if appt.start_datetime < DateTime.now
      raise ArgumentError.new("Cannot book an appointment before present.")
    end
    student = Student.find_by(id: params[:student_id])
    student.appointments << appt
    student.save
    if student.errors.empty?
      appt.status = "Booked"
      appt.save

      render json: {
          appointment: appt
      }
    else
      render json: {
          status: 500,
          errors: [student.errors.full_messages, appt.errors.full_messages]
      }
    end
  end

  private
  def appointment_params
      params.require(:appointment).permit(:id, :start_datetime, :coach_id, :status, :student_satisfaction_score, :notes)
  end
end
