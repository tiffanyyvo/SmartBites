import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SmartBitesLogo from '../assets/Smartbites_logo.png';
import FridgeImage from "../assets/fridge_image.png";

function LandingPage() {
    //for scroll- so it doesnt snap right up

    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        if (token && email) {
            setLoggedIn(true);
            setUserName(email.split('@')[0]); // uses part before @ as name
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

  return (
    <div className="landing-container">
      {/* top page bar */}
      <nav className="navbar">
        <div className="nav-logo">
          <img src={SmartBitesLogo} alt="SmartBites Logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <Link to="/explore"><h4>Explore</h4></Link>
          <Link to="/snap"><h4>Snap</h4></Link>
          <Link to="/resources"><h4>Resources</h4></Link>
          <Link to="/contact"><h4>Contact</h4></Link>
        </ul>
        <div className="nav-actions">
            {/* sign in goes to snap for now, until sign in is implemented*/}
            {!loggedIn ? (
              <Link to="/sign-in">
                  <button className="btn-signin">Login/Register</button>
              </Link>
            ) : (
            <Link to="/profile">
              {/* will need to add functionality to check if logged in*/}
                <button className="btn-signin">Hi, {userName}!</button>
            </Link>
            )}
        </div>
      </nav>

      {/* title box */}
      <header className="title-section">
        <h1>SmartBites</h1>
        <h2>Snap. Scan. Savor.</h2>
        <div className="title-actions">
          {!loggedIn ? (
            <Link to ="/sign-in">
                <button className="btn-signin">Login/Register</button>
            </Link>
          ) : (
            <Link to ="/profile">
                <button className="btn-signin">Hi, {userName}!</button>
            </Link>
          )}
        </div>
      </header>

      {/* app features */}
      <section className="features-section">
        <h3 className="features-title">Snap. Scan. Savor. Explore.</h3>
        <div className="features-grid">
          <div className="feature-item">
            <span className="icon">ⓘ</span>
            <div className="feature-text">
              <h4>Snap</h4>
              <p>Snap a picture of your fridge or pantry.</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="icon">ⓘ</span>
            <div className="feature-text">
              <h4>Scan</h4>
              <p>SmartBites will scan your upload and send it through our AI.</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="icon">ⓘ</span>
            <div className="feature-text">
              <h4>Savor</h4>
              <p>Savor the delish Recipes that SmartBites provides from your submission.</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="icon">ⓘ</span>
            <div className="feature-text">
              <h4>Explore</h4>
              <p>Explore recipies generated and loved by other users.</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="icon">ⓘ</span>
            <div className="feature-text">
              <h4>Zero Waste</h4>
              <p>On a mission to eliminate every day food waste.</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="icon">ⓘ</span>
            <div className="feature-text">
              <h4>Save</h4>
              <p>If you find a recipe that you like, you can save it for later!</p>
            </div>
          </div>
        </div>
      </section>

      {/* demo pic! */}
      <section className="demo-section">
        <div className="demo-image-placeholder">
          {/* need to add a pic here */}
          <img src={FridgeImage} alt="FridgeImage" className="demo-img-small-test" />
        </div>
      </section>

      {/* footer? -ask if they want this */}
      <footer className="footer-section">
        <div className="footer-logo">
           <img src={SmartBitesLogo} alt="SmartBites Logo" className="logo-img-small" />
        </div>
        <div className="footer-columns">
          {/*<div className="footer-col">
            <h4>Add Title</h4>
            <ul>
              <li>lala</li>
              <li>lala</li>
            </ul>
          </div>*/}
          <div className="footer-col">
            <h4>Our Design</h4>
            <ul>
              <li>Design</li>
              <li>Resources</li>
              <li>Development features</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>About Us</h4>
            <ul>
              <li>Meet our Team</li>
              <li>Contact Us</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>
        <div className="footer-upload" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
            <span className="upload-icon">↑</span>
          </div>
      </footer>
    </div>
  );
}

export default LandingPage;