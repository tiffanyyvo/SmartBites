import { Link } from 'react-router-dom';
import SmartBitesLogo from '../assets/Smartbites_logo.png';

function LandingPage() {
  return (
    <div className="landing-container">
      {/* top page bar */}
      <nav className="navbar">
        <div className="nav-logo">
          <img src={SmartBitesLogo} alt="SmartBites Logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li>Solutions</li>
          <li>Community</li>
          <li>Resources</li>
          <li>Contact</li>
        </ul>
        <div className="nav-actions">
            {/* sign in goes to snap for now, until sign in is implemented*/}
            <Link to="/snap">
                <button className="btn-signin">Sign In</button>
            </Link>
            <Link to="/snap">
                <button className="btn-register">Register</button>
            </Link>
        </div>
      </nav>

      {/* title box */}
      <header className="title-section">
        <h1>SmartBites</h1>
        <h2>Snap. Scan. Savor.</h2>
        <div className="title-actions">
            <Link to ="/snap">
                <button className="btn-signin">Sign In</button>
          </Link>
          <Link to="/snap">
            <button className="btn-register">Register</button>
          </Link>
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
              <p>description</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="icon">ⓘ</span>
            <div className="feature-text">
              <h4>Scan</h4>
              <p>description</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="icon">ⓘ</span>
            <div className="feature-text">
              <h4>Savor</h4>
              <p>description</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="icon">ⓘ</span>
            <div className="feature-text">
              <h4>Explore</h4>
              <p>talk about community aspects</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="icon">ⓘ</span>
            <div className="feature-text">
              <h4>Zero Waste</h4>
              <p>talk about a zero waste mission</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="icon">ⓘ</span>
            <div className="feature-text">
              <h4>Save</h4>
              <p>talk about saving recipes</p>
            </div>
          </div>
        </div>
      </section>

      {/* demo pic! */}
      <section className="demo-section">
        <div className="demo-image-placeholder">
          {/* need to add a pic here */}
          <p>[ demo pic/snap page ss can go here]</p>
        </div>
      </section>

      {/* footer? -ask if they want this */}
      <footer className="footer-section">
        <div className="footer-logo">
           <img src={SmartBitesLogo} alt="SmartBites Logo" className="logo-img-small" />
           /* we can get rid of these i just think they look so cute and professional */
           <div className="social-icons">𝕏 📷</div>
        </div>
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Add Title</h4>
            <ul>
              <li>lala</li>
              <li>lala</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Our Design</h4>
            <ul>
              <li>Design</li>
              <li>Resources</li>
              <li>Development features</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li>Contact Us</li>
              <li>Best practices</li>
            </ul>
          </div>
        </div>
        <div className="footer-upload">
          <span className="upload-icon">↑</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;