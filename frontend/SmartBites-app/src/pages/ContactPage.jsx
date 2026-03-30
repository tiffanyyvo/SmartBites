import { useState } from 'react';
import { Link } from 'react-router-dom';

import user_logo from '../assets/user.png';
import email_logo from '../assets/email.png';
import password_logo from '../assets/password.png';
import question_logo from '../assets/question.png';

function ContactPage() {
  return (
    <div className="snap-main-area">
          <div className="white-card">
              <div className="card-content-wrapper">
                <div className="card-header">
                  <Link to="/">
                    <button className="button-snap">←</button>
                  </Link>
                  <div>
                    <h1>Contact</h1>
                    <p>Fill out the information below so we can help answer any questions or queries that you may have!</p>
                    
                    <div className="inputs">
                        <div className="input">
                          <img src={user_logo} alt="" style={{ height:20, width:20}} />
                          <input type="name" placeholder="Name" name="name" id="name" required/>
                        </div>

                        <div className="input">
                          <img src={email_logo} alt="" style={{ height:20, width:20}} />
                          <input type="text" placeholder="Email" name="email" id="email" required/>
                        </div>

                        <div className="input">
                          <img src={question_logo} alt="" style={{ height:20, width:20}} />
                          <input type="text-box" placeholder="Enter Question" name="question" id="question" required/>
                        </div>

                        <div className="submit-container">
                          <Link to="/register"> {/* we need to have a thank you screen*/}
                            <div className="submit">Submit Question</div>
                          </Link>
                        </div>
                    </div>
                  </div>
                </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;