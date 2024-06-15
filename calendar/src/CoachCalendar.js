import React, { useState } from 'react';
import Calendar from 'react-calendar';
import CoachAppointments from './CoachAppointments.js';

export default function CoachCalendar({ coach_id }) {
  const [date, setDate] = useState(new Date(new Date().setHours(0,0,0,0)));

  return(
    <>
      <div>
        <Calendar
          onChange={setDate}
          value={date}
          minDetail="month"
          onClickDay={setDate}
          tileDisabled={tileDisabled}
          minDate={new Date(Date.now() - (6.048e+8 * 8))}
          maxDate={new Date(Date.now() + (6.048e+8 * 2))}
        />
      </div>
      <div>
        <CoachAppointments coach_id={coach_id} date={date} />
      </div>
    </>
  )

}

function tileDisabled({ date, view }) {
  if (view === 'month') {
    return date.getDay() === 6 || date.getDay() === 0;
  }
}