import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentAppointments({ student_id, date }) {
    const [appointments, setAppointments] = useState([]);
    const [bookingState, setBookingState] = useState(null);

    useEffect(() => 
        {
            axios.get(`http://localhost:3001/api/v1/students/${student_id}/appointments/`,
                    { params: { student_id: {student_id}, date: {date} }},
                    {withCredentials: true}
                ).then(response => {
                    if (response.data.appointments) {
                        setAppointments(response.data.appointments);
                    } else {
                        console.log("Failed to get appointments for student");
                    }
                }
            );
        }, [date]
    );

    return (
		<>
			<div>
				<h3>Appointment Slots for {date.toString()}</h3>
				<br></br>
			</div>
			<div>
				{
                    appointments ? appointments.map(appt => (
                        <div key={appt.id}>
                            <ul key={appt.id}>
                              <li key={appt.id}>Appointment ID: {appt.id}</li>
                              <li>{`Coach Name: ${appt.coach.first_name} ${appt.coach.last_name}`}</li>
                              <li>{appt.start_datetime}</li>
                              <li>{appt.status}</li>
                            </ul>
                            <br></br>
                            <button className="button" onClick={(e) => bookAvailableAppointment(appt, student_id, setBookingState)}>Book Appointment</button>
                            {/* <Link to='http://localhost:3000/'>Book Appointment</Link> */}
                        </div>
                    )) : (
                        <div>No appointments found</div>
                    )
                }
			</div>
		</>
	);
}

function bookAvailableAppointment(appt, student_id, setBookingState) {
    let appointment = {
        id: appt.id,
        start_datetime: appt.start_datetime,
        coach_id: appt.coach_id,
        status: appt.status,
    }

    axios.post(`http://localhost:3001/api/v1/students/${student_id}/book_appointment`,
        {appointment, student_id}, {withCredentials: true}
    ).then(response => {
        if (response.data.appointment) {
            setBookingState("Success!");
            // window.location.reload();
            
        } else {
            console.log(`Failed to book appointment, ${response.errors}`);
        }
    })
}


