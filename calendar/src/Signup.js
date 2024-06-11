import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Signup(props) {
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        type: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        errors: ''
    });

    const navigate = useNavigate();

    function handleChange(event) {
        const {name, value} = event.target
        setState({
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        const {username, email, password, password_confirmation, type, first_name, last_name, phone_number} = state
        let user = {
            username: username,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            type: type,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
        }

        axios.post('http://localhost:3001/api/v1/users', 
            {user}, 
            {withCredentials: true}
        ).then(response => {
            if (response.data.status === 'created') {
                props.handleLogin(response.data);
                redirect();
            } else {
                setState({
                    errors: response.data.errors
                })
            }
        })
    }

    function redirect() {
        navigate('/');
    }

    function handleErrors() {
        return (
            <div>
                <ul>
                    {state.errors.map((error) => {
                        return <li key={error}>{error}</li>
                    })}
                </ul>
            </div>
        )
    }

    const { username, email, password, password_confirmation, first_name, last_name, phone_number, type } = state;
    
    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />
                <input
                    placeholder="email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    placeholder="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <input
                    placeholder="password confirmation"
                    type="password"
                    name="password_confirmation"
                    value={password_confirmation}
                    onChange={handleChange}
                />
                <input
                    placeholder="type"
                    type="type"
                    name="type"
                    value={type}
                    onChange={handleChange}
                />
                <input
                    placeholder="first name"
                    type="text"
                    name="first_name"
                    value={first_name}
                    onChange={handleChange}
                />
                <input
                    placeholder="last name"
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={handleChange}
                />
                <input
                    placehlolder="phone number"
                    type="text"
                    name="phone_number"
                    value={phone_number}
                    onChange={handleChange}
                />
                <button placeholder="submit" type="submit">Sign Up</button>
            </form>
        </div>
    );
}