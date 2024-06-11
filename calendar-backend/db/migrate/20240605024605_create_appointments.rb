class CreateAppointments < ActiveRecord::Migration[7.0]
  def change
    create_table :appointments do |t|
      t.datetime :start_datetime
      t.references :coach, null: false, foreign_key: { to_table: :users }
      t.references :student, null: true, foreign_key: { to_table: :users }
      t.integer :student_satisfaction_score
      t.string :notes
      t.string :status

      t.timestamps
    end
  end
end
