import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Logout(props) {
    const navigate = useNavigate();
    useEffect(() => {
        axios.delete('http://localhost:3001/api/v1/logout', 
            {data: {}, withCredentials: true }
        ).then(response => {
            props.handleLogout();
            navigate('/');
        })
        .catch(error => console.log(error))
    }, [props.user]);

    // useEffect(logOut, []);
}