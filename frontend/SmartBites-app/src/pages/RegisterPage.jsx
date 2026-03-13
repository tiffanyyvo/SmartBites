import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', age: '', email: '', username: '', password: '', passwordRep: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError('');

    if (!formData.email || !formData.password) {
      return setError('Email and password are required.');
    }
    if (formData.password.length < 8) {
      return setError('Password must be at least 8 characters.');
    }
    if (formData.password !== formData.passwordRep) {
      return setError('Passwords do not match.');
    }

    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.error || 'Registration failed.');
      }

      localStorage.setItem('token', data.token);
      navigate('/');
    } 
    catch (err) {
      setError('Could not connect to server.');
    }
  };

  return (
    <div className="snap-main-area">
          <div className="white-card">
              <div className="card-content-wrapper">
                <div className="card-header">
                  <Link to="/">
                    <button className="button-snap">←</button>
                  </Link>
                  <div>
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <p>
                      <label for="name"><b>Name: </b></label>
                      <input type="text" placeholder="Enter Name" name="name" id="name"
                      value={formData.name} onChange={handleChange} required/>
                    </p>

                    <p>
                      <label for="age"><b>Age: </b></label>
                      <input type="number" placeholder="Enter Age" name="age" id="age"
                        value={formData.age} onChange={handleChange} required/>
                    </p>

                    <p>
                      <label for="email"><b>Email: </b></label>
                      <input type="text" placeholder="Enter Email" name="email" id="email"
                        value={formData.email} onChange={handleChange} required/>
                    </p>

                    <p>
                      <label for="username"><b>Username: </b></label>
                      <input type="text" placeholder="Enter Username" name="username" id="username"
                        value={formData.username} onChange={handleChange} required/>
                    </p>

                    <p>
                      Your Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and a special number
                    </p>

                    <p>
                      <label for="password"><b>Password: </b></label>
                      <input type="password" placeholder="Enter Password" name="password" id="password"
                        value={formData.password} onChange={handleChange} required/>
                    </p>

                    <p>
                      <label for="passwordRep"><b>Re-Enter Password: </b></label>
                      <input type="password" placeholder="Re-Enter Password" name="passwordRep" id="passwordRep"
                        value={formData.passwordRep} onChange={handleChange} required/>
                    </p>

                    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
                  </div>
                </div>

          <div className="action-buttons">
            {/* snap triggers the AI */}
            <button className="btn-snap" onClick={handleRegister}>
              ✓ Create Account
            </button>
            <button className="btn-upload">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;