class Api::V1::AppointmentsController < ApplicationController
    #might need to make an individual AppointmentController

    #create method -> abstract from coaches_controller

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
      if appointment && appointment.status == "Booked"
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
      end
    end

    def available_appointments_for_date
        student = Student.find_by(id: params[:student_id])
        Rails.logger.fatal("DATE #{params[:date]}")
        date = params[:date][:date].to_date
        if student
            # Rails.logger.fatal("CHECK THIS: #{Appointment.all.includes(:coach).references(:coach)}")
            # Appointment.all.includes(:coach).references(:coach).each do |appointment|
            #     appointment.coach
            # Rails.logger.fatal("#{Appointment.all_available_appts_for_date(params[:date]).includes(:coach).references(:coach)}")
            render json: {
                # appointments: Appointment.all_available_appts_for_date(params[:date]).joins(:coach).includes(:first_name, :last_name, :phone_number)
                # appointments: Appointment.eager_load(:users).all_available_appts_for_date(params[:date]).select('users.*, appointments.*')
                appointments: Appointment.all_available_appts_for_date(date).as_json(include: :coach)
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

    def appointments_for_date
        # Appointment.all_appts_for_coach_for_date(coach: Coach.find_by(id: params[:coach_id], date: params[:date]))
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
        # appt.save # might not need this, will need to test
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

    # Appointment States
    # "Open" - appointment slot is open, but coach has yet to create appointment for that slot
    # "Available" - coach has created the appointment but it has not yet been booked by a student
    # "Booked" - appointment was available and was booked by a student
    # "Completed" - the appointment was successfully completed. Notes & Student Satisfaction Score should be recorded now.
    appointment_states = ["Open", "Available", "Booked", "Completed"]

    #TODO: method to show all appointments available in a day (for all coaches) --> must have state "Available"

    private
    def appointment_params
        params.require(:appointment).permit(:id, :start_datetime, :coach_id, :status)

        # params.permit(:appointment)
        # params.permit(:id,:start_datetime, :coach_id, :student_id, :notes, :coach, :student_satisfaction_score, :status)
    end
end
