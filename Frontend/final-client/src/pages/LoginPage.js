import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const LoginPage = () => {
  // State to store user input for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  

  const getCsrfToken = async () => {
    const response = await fetch('http://localhost:8000/api/csrf/');
    const data = await response.json();
    setToken(data.csrfToken);
  };
  

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');  // Clear previous error
    setIsLoading(true);  // Set loading state

    // Checking if fields are blank
    if (username === '' || password === '') {
      setError('Username and password are required');
      setIsLoading(false);  // Reset loading state
      return;
    }
    console.log("user:", username, "password:  ", password)
    //const csrfToken = getCSRFToken();
    // Sending login request to the backend
    fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: 'same-origin',  // Ensures the session cookie is sent
    })
    .then(response => {
      if (!response.ok) {
        console.log("response header:  ", response.headers)
        throw new Error('Login failed. Please check your credentials.');
      }
      // eslint-disable-next-line no-restricted-globals
      navigate('/')
      return response.json();
    })
    .then(data => {
      // Handle successful login response (optional - redirect, or store user info in state)
      console.log('Login successful', data);
      // Example: redirect to a dashboard or home page
      // window.location.href = '/dashboard';
    })
    .catch(error => {
      setError(error.message);  // Display error message
    })
    .finally(() => {
      setIsLoading(false);  // Reset loading state
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="login-input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

