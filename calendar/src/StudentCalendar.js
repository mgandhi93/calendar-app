import React, { useState } from 'react';
import Calendar from 'react-calendar';
import StudentAppointments from './StudentAppointments';

export default function StudentCalendar({ student_id }) {
  const [date, setDate] = useState(new Date());
  const [studentAppointments, setStudentAppointments] = useState(null);

  function onClickDay(value, event) {
    setDate(value);
  }

  return (
    <>
      <div>
        <Calendar
          onChange={setDate}
          value={date}
          minDetail="month"
          onClickDay={onClickDay}
          tileDisabled={tileDisabled}
          minDate={new Date(Date.now() - (6.048e+8 * 2))}
          maxDate={new Date(Date.now() + (6.048e+8 * 2))}
        />
      </div>
      <div>
        <StudentAppointments student_id={student_id} date={date} />
      </div>
    </>
  )
}

function tileDisabled({ date, view }) {
  if (view === 'month') {
    return date.getDay() === 6 || date.getDay() === 0;
  }
}

function sortArrayByDate(array) {
  array.sort((a, b) => {
    let c = new Date(a.date);
    let d = new Date(b.date);
    return c - d;
  });
}