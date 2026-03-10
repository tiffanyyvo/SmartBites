import { useState } from 'react';
import { Link } from 'react-router-dom';
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

                    <p>
                      <label for="name"><b>Name: </b></label>
                      <input type="text" placeholder="Enter Name" name="name" id="name" required/>
                    </p>

                    <p>
                      <label for="username"><b>Username: </b></label>
                      <input type="text" placeholder="Enter Username" name="username" id="username" required/>
                    </p>

                    <p>
                      <label for="email"><b>Email: </b></label>
                      <input type="text" placeholder="Enter Email" name="email" id="email" required/>
                    </p>

                    <p>
                      <label for="question"><b>Question or query: </b></label>
                      <input type="text-box" placeholder="Enter question or query" name="question" id="question" required/>
                    </p>
                  </div>
                </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;