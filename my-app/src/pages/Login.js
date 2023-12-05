import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'; // Import the CSS file here

function Login() {
    let navigate = useNavigate();

    const handleLogin = (e) => {
        // e.preventDefault();
        // Perform login logic here
        // ...

        // Navigate to another page on successful login
        navigate('/restaurants');
    };
    
    return (
        <div className="login-page">
        <form className="login-form">
            <h1>Login</h1>
            <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" />
            </div>
            <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" />
            </div>
            {/* <button type="submit" className="submit-button" onSubmit={handleLogin}>Login</button> */}
            <button className="submit-button" onClick={handleLogin}>Login</button>
            <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </form>
        </div>
  );
}

export default Login;
