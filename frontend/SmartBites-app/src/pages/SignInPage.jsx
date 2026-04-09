import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import user_logo from '../assets/user.png';
import email_logo from '../assets/email.png';
import password_logo from '../assets/password.png';

function SignInPage() {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      return setError('Email and password are required.');
    }

    try {
      const res = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.error || 'Login failed.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);
      navigate('/'); // redirect to home after login
    } 
    catch (err) {
      setError('Could not connect to server.');
    }
  };

  return (
    <div>
      <div className="snap-main-area">
        <div className="white-card-signin">
          <div className="card-content-wrapper">
                <div className="card-header">
                  <Link to="/">
                    <button className="button-snap">←</button>
                  </Link>
                  <div>
                    <h1>Login</h1>
                    <p>Use your log in credentials to access your account</p>
                  </div>
                </div>

              <div className="inputs">
                <div className="input">
                  <img src={email_logo} alt="" style={{ height:20, width:20}} />
                  <input type="email" placeholder="Email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
                  <img src={password_logo} alt="" style={{ height:20, width:20}} />
                  <input type="password" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div className="submit-container">
                <div className="submit" onClick={handleLogin}>Login</div>
                <Link to="/register">
                  <div className="submit gray">Create Account</div>
                </Link>
              </div>
              </div>
            </div>
        </div>
      </div>
  );
  
}

export default SignInPage;

{/*<a href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Freepik - Flaticon</a>*/}