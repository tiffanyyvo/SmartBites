import { useState } from 'react';
import { Link } from 'react-router-dom';
import SmartBitesLogo from '../assets/Smartbites_logo.png';
import user_logo from '../assets/user.png';
import email_logo from '../assets/email.png';
import password_logo from '../assets/password.png';
import question_logo from '../assets/question.png';
import info_logo from '../assets/info.png';

function MakePostPage() {
  
  return (

    
    <div className="snap-layout">
      <nav className="snap-sidebar">
        <div className="sidebar-top-icons">
          <div className="icon-menu">≡</div>
        </div>
        <ul className="sidebar-links">
          <li>
            <Link to="/snap">
              <span className="nav-text">Snap</span>
            </Link>
          </li>
          <li>
            <Link to="/explore">
              <span className="nav-text">Explore</span>
            </Link>
          </li>
          <li>
            <Link to="/my-recipes">
              <span className="nav-text" style={{ fontWeight: 'bold' }}>My Recipes</span>
            </Link>
          </li>
        </ul>
      </nav>
    <div className="snap-main-area">
          <div className="white-card">
              <div className="card-content-wrapper">
                <div className="card-header">
                  <Link to="/my-recipes">
                    <button className="button-snap">←</button>
                  </Link>

                  <div className="inputs">
                    <div>
                    <h1>Make a Post</h1>
                  </div>
                        {/* need to be able to save what was clicked in the myrecipes to this page and when clikc pst it should take it back to the explore page*/}
                        <div className="input">
                        <img src={user_logo} alt="" style={{ height:20, width:20}} />
                        <input type="name" placeholder="Name" name="name" id="name" required/>
                        </div>

                        <div className="input">
                        <img src={info_logo} alt="" style={{ height:20, width:20}} />
                        <input type="text" placeholder="Description" name="description" id="description" required/>
                        </div>

                        <div className="submit-container">
                        <Link to="/explore">
                            <button className="submit" onClick={() => setSubmitted(true)}>Post</button>
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

export default MakePostPage;