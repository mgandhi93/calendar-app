import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CoachAppointments.css';

export default function CoachAppointments({ coach_id, date }) {
  const [appointments, setAppointments] = useState(null);
  const [update, triggerUpdate] = useState(null);
  const [score, setScore] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/v1/coaches/${coach_id}/appointmentsForDate/`,
      { params: { coach_id: coach_id, date: date }},
      {withCredentials: true}
      ).then(response => {
        if (response.data.appointments) {
          setAppointments(response.data.appointments);
        } else {
          console.log("Failed to get appointments for coach");
        }
      })
  }, [date, coach_id, update, score, notes]);

  useEffect(() => {
    formatButtons(appointments);
  }, [appointments, date, update]);
    
  return (
    <>
      <div>
        <h2>Appointment Slots for {date.toString()}</h2>
        <br></br>
        <button id="8AM" className="button"  onClick={(event) => createAppointmentForCoachAndDateTime(coach_id, date.setHours(8), event, setAppointments) }>8AM</button>
          <button id="10AM" className="button" onClick={(event) => createAppointmentForCoachAndDateTime(coach_id, date.setHours(10), event, setAppointments)}>10AM</button>
          <button id="12PM" className="button" onClick={(event) => createAppointmentForCoachAndDateTime(coach_id, date.setHours(12), event, setAppointments)}>12PM</button>
          <button id="2PM" className="button" onClick={(event) => createAppointmentForCoachAndDateTime(coach_id, date.setHours(14), event, setAppointments)}>2PM</button>
          <button id="4PM" className="button" onClick={(event) => createAppointmentForCoachAndDateTime(coach_id, date.setHours(16), event, setAppointments)}>4PM</button>
      </div>
      <div>
        {
          appointments ? appointments.map(appt => (
            <div key={appt.id}>
              <ul key={appt.id}>
                <li key={appt.id}>Appointment ID: {appt.id}</li>
                <li>{`Coach Name: ${appt.coach.first_name} ${appt.coach.last_name}`}</li>
                <li>{new Date(appt.start_datetime).toLocaleString("en-US", { timeZone: "America/New_York" })}</li>
                <li>{appt.status}</li>
                {
                  appt.status === "Booked" &&
                  <>
                    <li>Coach Phone Number: {appt.coach.phone_number}</li>
                    <li>Student Name: {appt.student.first_name} {appt.student.last_name}</li>
                    <li>Student Phone Number: {appt.student.phone_number}</li>
                    <li>
                      <>
                        <form onSubmit={(e) => markAppointmentComplete(e, appt, appt.coach)}>
                          <button type="submit" className="button" onClick={(event) => markAppointmentComplete(event, appt, appt.coach, setAppointments)}>Mark Appointment Complete</button>
                        </form>
                      </>
                    </li>
                  </>
                }
                {
                  appt.status === "Complete" &&
                    appt.student_satisfaction_score === null ?
                      <>
                        <li>Student Satisfaction Score:<br></br>
                          <select id="score" onChange={(e) => submitStudentSatisfactionScore(e.target.value, appt, coach_id, setScore)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </li>
                      </> : appt.status === "Complete" && appt.student_satisfaction_score !== null ?
                      <>
                        <li>Student Satisfaction Score: {appt.student_satisfaction_score}</li>
                      </> : null
                }
                {
                  appt.status === "Complete" &&
                    appt.notes === null ?
                      <>
                        <li>Notes:<br></br>
                          <form onSubmit={(e) => submitNotes(e, appt, coach_id, notes, setNotes)}>
                            <input type="text" className="input" onChange={(e) => handleChange(e, setNotes)}></input><br></br>
                            <button type="submit" className="note" onClick={(e) => submitNotes(e, appt, coach_id, notes, setNotes)}>Submit</button>
                          </form>
                        </li>
                      </> : appt.status === "Complete" && appt.notes !== null ? 
                      <>
                        <li>Notes : {appt.notes}</li>
                      </> : null
                }
              </ul>
              <br></br>
            </div>
          )) : (
            <div>No appointments found</div>
          )
        }
			</div>
		</>
	);
}

function handleChange(event, setNotes) {
  setNotes(event.target.value);
}

function submitNotes(event, appt, coach_id, notes, setNotes) {
  event.preventDefault();

  let appointment = {
    id: appt.id,
    notes: notes
  }

  axios.post(`http://localhost:3001/api/v1/coaches/${coach_id}/setNotes`, {appointment}, 
    {withCredentials: true}
  ).then(response => {
    setNotes(response.data.appointment.notes);
  });
}

function submitStudentSatisfactionScore(score, appt, coach_id, setScore) {
  let appointment = {
    id: appt.id,
    student_satisfaction_score: score
  }

  axios.post(`http://localhost:3001/api/v1/coaches/${coach_id}/setStudentSatisfactionScore`, {appointment},
    {withCredentials: true}
  ).then(response => {
    setScore(response.data.appointment.student_satisfaction_score);
  });
}

function markAppointmentComplete(event, appt, coach_id, setAppointments) {
  event.preventDefault();
  if (new Date() < appt.start_datetime) {
    throw new Error('Cannot transition appointment to completed until it has happened');
  }

  let appointment = {
    id: appt.id
  }

  axios.post(`http://localhost:3001/api/v1/coaches/${coach_id}/markAppointmentComplete`, 
    {appointment}, 
    {withCredentials: true}
  ).then(response => {
    if (response.data.appointment) {
      // setAppointments(response.data.appointment); 
    }
  });
}

function createAppointmentForCoachAndDateTime(coach_id, date, event, setAppointments) {
  event.preventDefault();

  let appointment = {
    coach_id: coach_id,
    status: "Available",
    start_datetime: new Date(date)
  }

  axios.post(`http://localhost:3001/api/v1/coaches/${coach_id}/appointment`,
    {appointment}, {withCredentials: true}
  ).then(response => {
    if (response.data.appointment) {
      // setAppointments([response.data.appointment]);
    }
  });
}

function formatButtons(appointments) {
  Array.from(document.getElementsByClassName('button')).forEach(button => {
    button.disabled = false;
  });

  appointments?.forEach(appt => {
    let hours = new Date(appt.start_datetime).getHours();
    switch (hours) {
      case 8:
        document.getElementById("8AM").disabled = true;
        break;
      case 10:
        document.getElementById("10AM").disabled = true;
        break;
      case 12:
        document.getElementById("12PM").disabled = true;
        break;
      case 14:
        document.getElementById("2PM").disabled = true;
        break;
      case 16:
        document.getElementById("4PM").disabled = true;
        break;
      default:
        break;
    }
  });
}