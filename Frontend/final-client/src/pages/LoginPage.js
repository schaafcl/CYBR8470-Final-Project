import React, { useState } from 'react';

const LoginPage = () => {
    // State to manage form inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Reset previous error
        setError('');

        try {
            // get a jwt token for authentication permissions
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            // store the jwt token if login is successful
            if (response.ok) {
                const data = await response.json();
                const token = data.access;
                localStorage.setItem('access_token', token);
                // redirect to home page after successful login
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Your username and password didn\'t match. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;