import { useState } from 'react';
import { Link } from 'react-router-dom';

import user_logo from '../assets/user.png';
import email_logo from '../assets/email.png';
import password_logo from '../assets/password.png';
import question_logo from '../assets/question.png';
import info_logo from '../assets/info.png';

function ContactPage() {
  
  const[submitted, setSubmitted] = useState(false);

  return (
    <div className="snap-main-area">
          <div className="white-card">
              <div className="card-content-wrapper">
                <div className="card-header">
                  <Link to="/">
                    <button className="button-snap" onClick={() => setSubmitted(true)}>←</button>
                  </Link>
                  <div>
                    <h1>Contact</h1>
                    <p>Fill out the information below so we can help answer any questions or queries that you may have! You can also contact our toll free number at 1-800-123-456-7891!</p>
                    
                    {!submitted ? (
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
                          <button className="submit" onClick={() => setSubmitted(true)}>Submit Question</button>
                        </div>
                    </div>
                    ) : (

                      <div className="card-header">
                        <h2> Thank you! </h2>
                          <button className="submit" onClick={() => setSubmitted(false)}>Submit Another Question</button>
                        </div>
                    )}
                  </div>
                </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;