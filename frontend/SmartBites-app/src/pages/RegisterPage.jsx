import { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  
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
                    
                    <p>
                      <label for="name"><b>Name: </b></label>
                      <input type="text" placeholder="Enter Name" name="name" id="name" required/>
                    </p>

                    <p>
                      <label for="age"><b>Age: </b></label>
                      <input type="number" placeholder="Enter Age" name="age" id="age" required/>
                    </p>

                    <p>
                      <label for="email"><b>Email: </b></label>
                      <input type="text" placeholder="Enter Email" name="email" id="email" required/>
                    </p>

                    <p>
                      <label for="username"><b>Username: </b></label>
                      <input type="text" placeholder="Enter Username" name="username" id="username" required/>
                    </p>

                    <p>
                      Your Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and a special number
                    </p>

                    <p>
                      <label for="password"><b>Password: </b></label>
                      <input type="text" placeholder="Enter Password" name="password" id="password" required/>
                    </p>

                    <p>
                      <label for="password-rep"><b>Re-Enter Password: </b></label>
                      <input type="text" placeholder="Re-Enter Password" name="password-rep" id="rep" required/>
                    </p>

                    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
                  </div>
                </div>

          <div className="action-buttons">
            {/* snap triggers the AI */}
            <button className="btn-snap">
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