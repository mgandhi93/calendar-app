import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import CoachAppointments from './CoachAppointments.js';

export default function CoachCalendar({ coach_id }) {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
      sortArrayByDate(appointments)
    }, [appointments, date]);

    return(
        <>
            <div>
                <Calendar
                    onChange={setDate}
                    value={date}
                    minDetail="month"
                    onClickDay={setDate}
                    tileDisabled={tileDisabled}
                    maxDate={new Date(Date.now() + (6.048e+8 * 2))}
                />
            </div>
            <div>
                <CoachAppointments coach_id={coach_id} date={date} />
            </div>
        </>
    )

}

// still need to test this functionality
function sortArrayByDate(array) {
    array.sort((a,b) => {
        let c = new Date(a.date);
        let d = new Date(b.date);
        return c-d;
    });
}

function tileDisabled({ date, view }) {
  console.log(`TILE SHOULD BE DISABLED; ${date} ${view}`);
  if (view === 'month') {
    return date.getDay() === 6 || date.getDay() === 0;
  }
}