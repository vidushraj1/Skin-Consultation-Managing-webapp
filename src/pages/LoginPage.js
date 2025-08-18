import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        axios.post(process.env.REACT_APP_API_BASE_URL + '/api/auth/login', { username, password })
            .then(response => {
                // Get the token from the response
                const token = response.data.token;
                
                // Store the token in localStorage
                localStorage.setItem('adminToken', token);
                
                // CORRECTED: Navigate to the admin dashboard page
                navigate('/admin/dashboard');
            })
            .catch(err => {
                console.error("Login failed:", err);
                setError('Login failed. Please check your username and password.');
            });
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Admin Login</h2>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default LoginPage;