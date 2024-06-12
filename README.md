# calendar-app

<p>React front-end and Rails API</p>
<p>
Usage:<br>
cd to `calendar` and run `npm start` to run the React front-end<br>
cd to `calendar-backend` and run `rails server` to run the Rails backend
</p>
<p>
There are two types of users - Coach and Student. Based on the user type, the appropriate calendar is shown. From the Student calendar, clicking on a date in the calendar shows all coaches' upcoming available appointments, along with all of the student's booked appointments. These appointments appear in a div below the calendar. Each available appointment has a button to Book Appointment. This transitions the appointment status from "Available" to "Booked" and reveals the Coach's phone number. 
</p>
<p>
From the Coach calendar, there are 5 buttons that appear in the div after clicking on a calendar date. These represent the 5 available appointment slots. Clicking on a button will create an appointment for that slot and disable the button. Making an appointment available will expose the appointment to the Student Calendar view. After an appointment datetime passes, a Coach can click the "Mark Appointment Complete" button to mark the appointment complete and show a form with the Student Satisfaction Score dropdown menu and Notes input. Submitting those updates the values. Coaches can view past Student Satisfaction Scores and Notes. 
</p>
<p>
Assumptions:
- Students can only see and book appointments up to 2 weeks ahead
- Coaches can only see and make available appointments up to 2 weeks ahead
- Students cannot view their completed appointments due to no story requirement
- Office hours are 8AM-6PM with 2-hour appointment slots, resulting in 5 possible appointments per day per coach
- The term "slot" is used slightly differently in this project vs the user stories - in the user stories, slot seems to be interchangeable with appointment. In this project, "slots" are the 5 available times each coach can create an appointment for a given office day. Appointments can have a state of "Available", "Booked", or "Completed".
</p>
<p>
Scope:
- Out of Scope:
  - Students cannot view completed past appointments, only coaches per the user stories
</p>
<p>
Out of Time:
- Due to time constraints, I implemented the bare minimum styles.
- There is further refactoring ability within the React app. My knowledge is primarily backend-focused so I may not have followed proper conventions in areas.

</p>
<p>
Current Bugs:
- Sign Up is currently not working. Please create users manually (e.g. using Rails console)
- If you are logged in but do not see a calendar, please log out and log back in.
- In the calendar view, after performing an action, if the below div does not reload you must re-click on the selected date in the Calendar to trigger a re-load.
</p>
<p>
Further Improvements:
- Re-factor both projects further
- Use sub-modules in Github for monorepo setup
- Switch DB from SQLite -> Postgres
</p>
<p>
Rails Libraries
- rack-cors
- bcrypt
</p>
<p>
React Components
- moment.js
- react-calendar
</p>