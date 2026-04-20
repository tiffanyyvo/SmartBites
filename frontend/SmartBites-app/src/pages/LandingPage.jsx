import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SmartBitesLogo from '../assets/Smartbites_logo.png';
import FridgeScan from "../assets/FridgeScan1.png";

function LandingPage() {

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
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/snap">Snap</Link></li>
          <li><Link to="/my-recipes">My Recipes</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/contact">Contact</Link></li>
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
      <div className="title-left">
        <h1>Your fridge, <em>reimagined.</em></h1>
        <h2>Snap a photo of your ingredients. Get personalized recipes instantly. Reduce waste, eat better, savor more.</h2>
        <div className="title-actions">
          {!loggedIn ? (
            <Link to="/sign-in">
              <button className="btn-signin">Login/Register</button>
            </Link>
          ) : (
            <Link to="/profile">
              <button className="btn-signin">Hi, {userName}!</button>
            </Link>
          )}
          <Link to="/explore">
            <button className="btn-ghost">Explore recipes</button>
          </Link>
        </div>
      </div>
      <div className="title-right">
        <img src={FridgeScan} alt="Fridge" className="hero-fridge-img" />
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

      {/* footer */}
      <footer className="footer-section">
        <div className="footer-columns">
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