class Appointment < ApplicationRecord
  belongs_to :coach, class_name: "User"
  belongs_to :student, class_name: "User", optional: true

  validates :student_satisfaction_score, allow_nil: true, inclusion: 1..5

  validates :start_datetime, uniqueness: true, on: :create
  validates :status, inclusion: { in: ["Available", "Booked", "Complete"] }

  scope :all_appts_for_date, ->(date) { where(start_datetime: date.to_date.beginning_of_day..date.to_date.end_of_day) }
  scope :all_appts_for_coach, ->(coach) { where(coach: coach) }
  scope :all_appts_for_coach_for_date, ->(date) { all_appts_for_coach.where(start_datetime: date.to_date.beginning_of_day..date.to_date.end_of_day) }
  scope :all_available_appts, -> { where(status: "Available") }
  scope :all_available_appts_for_date, ->(date) { all_available_appts.where(start_datetime: date.to_date.beginning_of_day..date.to_date.end_of_day) }
  scope :all_booked_appts, -> { where(status: "Booked") }
  scope :all_booked_appts_for_date, ->(date) { all_booked_appts.where(start_datetime: date.to_date.beginning_of_day..date.to_date.end_of_day) }
end
