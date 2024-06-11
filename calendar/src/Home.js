import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home(props) {
    const navigate = useNavigate();

    function handleClick() {
        axios.delete('http://localhost:3001/logout', 
            {withCredentials: true}
        ).then(response => {
            props.handleLogout();
            navigate('/');
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            {
                props.loggedInStatus ? null : <Link to='/login'>Log In</Link>
            }
            <br></br>
            <Link to='/signup'>Sign Up</Link>
            <br></br>
            {
                props.loggedInStatus ? 
                    <Link to='/logout'>Log Out</Link> : null
            }
        </div>
    );
}