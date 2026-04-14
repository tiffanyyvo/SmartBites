import { useState } from 'react';
import { Link } from 'react-router-dom';
import SmartBitesLogo from '../assets/Smartbites_logo.png';

function ContactPage() {
  
  const[submitted, setSubmitted] = useState(false);

  return (
    <div className="snap-layout">
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/"><img src={SmartBitesLogo} alt="SmartBites Logo" className="logo-img" /></Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/snap">Snap</Link></li>
          <li><Link to="/my-recipes">My Recipes</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="nav-actions">
          <Link to="/profile"><button className="btn-signin">Profile</button></Link>
        </div>
      </nav>
    <div className="snap-main-area">
          <div className="white-card" style={{ maxWidth: '800px' }}>
              <div className="card-content-wrapper">
                {!submitted ? (
              <>
                <h1 style={{ color: '#1a2e1b', marginBottom: '8px' }}>Contact</h1>
                <p style={{ color: '#6a8a6c', marginBottom: '32px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#1a2e1b', display: 'block', marginBottom: '6px' }}>Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #d4ead6',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#1a2e1b'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#1a2e1b', display: 'block', marginBottom: '6px' }}>Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #d4ead6',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#1a2e1b'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#1a2e1b', display: 'block', marginBottom: '6px' }}>Question</label>
                    <textarea
                      placeholder="What would you like to ask?"
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #d4ead6',
                        borderRadius: '10px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#1a2e1b',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <button
                    className="btn-signin"
                    style={{ width: '100%', padding: '14px', fontSize: '1rem', borderRadius: '10px', marginTop: '8px' }}
                    onClick={() => setSubmitted(true)}
                  >
                    Submit Question
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: '64px', height: '64px',
                  backgroundColor: '#edf9ee',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '28px'
                }}>✓</div>
                <h2 style={{ color: '#1a2e1b', marginBottom: '8px' }}>Thank you!</h2>
                <p style={{ color: '#6a8a6c', marginBottom: '28px' }}>We'll get back to you as soon as possible.</p>
                <button className="btn-signin" onClick={() => setSubmitted(false)}>
                  Submit Another Question
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default ContactPage;