import React, { useEffect, useState } from 'react';
import './index.css';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import Login from './Login.js';
import Signup from './Signup.js';
import CoachCalendar from './CoachCalendar.js';
import StudentCalendar from './StudentCalendar.js';
import Logout from './Logout.js';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("Student");
  const [date, setDate] = useState(new Date());

  function handleLogin(data) {
    setUser(data.user);
    setUserRole(data.type);
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setUser(null);
    setIsLoggedIn(false);
    setUserRole(null);
  }

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/authenticated',
      {withCredentials: true}
    ).then(response => {
      if (response.data.logged_in) {
        handleLogin(response.data);
      } else {
        handleLogout();
      }
    })
  }, [date]);

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              exact path='/'
              element={<Home handleLogout={handleLogout} loggedInStatus={isLoggedIn }/>}
            />
            <Route
              exact path='/login'
              element={<Login handleLogin={handleLogin} loggedInStatus={isLoggedIn} />}
            />
            <Route 
              exact path='/signup'
              element={<Signup handleLogin={handleLogin} loggedInStatus={isLoggedIn} />}
            />
            <Route
              exact path='/logout'
              element={<Logout handleLogout={handleLogout} loggedInStatus={isLoggedIn} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
      <div>
        {
          user && 
            <div>
              Welcome, {user.first_name} {user.last_name}
            </div>
        }
        
        {
          user === null ? <div>Please log in</div> : user.type === "Coach" ? <CoachCalendar coach_id={user.id} /> : <StudentCalendar student_id={user.id} />
        }
      </div>
    </>
  )
}
