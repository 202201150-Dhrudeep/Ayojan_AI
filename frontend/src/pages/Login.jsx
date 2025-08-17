import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css'; // common auth styles

const Login = () => {
  const navigate = useNavigate();
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
        console.log('Logging')
      // const res = await axios.post('${API_URL}/api/auth/login', {
      //   email,
      //   password,
      // });
      const res =await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,password}),
});

      // console.log(res.data)
      const ans=await res.json();
      console.log(ans)
      // const {  user } = ans.data;
      // localStorage.setItem('token', token);

      toast.success('✅ Login successful! Redirecting...', {
        position: 'top-right',
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate(`/dashboard/${ans.user._id}`);
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>🔐 Log In</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
