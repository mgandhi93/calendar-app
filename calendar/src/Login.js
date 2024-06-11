import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(props) {
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const {username, password} = user;

        let login = {
            username: username,
            password: password
        }

        axios.post('http://localhost:3001/api/v1/login', {login}, 
            {withCredentials: true}
        ).then(response => {
            if (response.data.logged_in) {
                props.handleLogin(response.data);
                redirect();
            } else {
                setUser({
                    errors: response.data.errors
                })
            }
        }).catch(error => console.log('api errors:', error))
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    function redirect() {
        navigate('/');
    }

    function handleErrors() {
        return (
            <div>
                <ul>
                    {user.errors.map(error => {
                        return <li key={error}>{error}</li>
                    })}
                </ul>
            </div>
        )
    }

    const {username, password} = user;

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />
                <input
                    placeholder="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <button placeholder="submit" type="submit">Log In</button>
                <div>
                    or <Link to='/signup'>Sign Up</Link>
                </div>
            </form>
            <div>
                {
                    user.errors ? handleErrors() : null
                }
            </div>
        </div>
    );
}