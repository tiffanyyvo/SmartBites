import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignInPage() {
  
  return (
    <div className="snap-main-area">
          <div className="white-card">
              <div className="card-content-wrapper">
                <div className="card-header">
                  <Link to="/">
                    <button className="button-snap">←</button>
                  </Link>
                  <div>
                    <h1>Sign In</h1>
                    <p>Use your log in credentials to access your account</p>
                    <p>
                      <label for="email"><b>Email: </b></label>
                      <input type="text" placeholder="Enter Email" name="email" id="email" required/>
                    </p>

                    <p>
                      <label for="password"><b>Password: </b></label>
                      <input type="text" placeholder="Enter Password" name="password" id="password" required/>
                    </p>
                  </div>
                </div>

          <div className="action-buttons">
            {/* snap triggers the AI */}
            <button className="btn-snap">
             Log In
            </button>
            <button className="btn-upload">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;