import { Link } from 'react-router-dom';
import SmartBitesLogo from '../assets/Smartbites_logo.png';
function ResourcesPage() {
  const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
  const resources = [
    {
      title: 'GitHub',
      description: 'View the SmartBites source code and contribute to the project.',
      link: 'https://github.com/tiffanyyvo/SmartBites',
      linkText: 'tiffanyyvo/SmartBites'
    },
    {
      title: 'MongoDB',
      description: 'The database powering SmartBites user accounts and saved recipes.',
      link: 'https://cloud.mongodb.com/v2/69a82155947e3831dc560363#/overview',
      linkText: 'View MongoDB'
    },
    {
      title: 'Gemini API',
      description: 'Generate your own Gemini API key to power the AI recipe generation.',
      link: 'https://aistudio.google.com/prompts/new_chat',
      linkText: 'Get Gemini API Key'
    }
  ];
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

            <h1 style={{ color: '#1a2e1b', marginBottom: '8px' }}>Resources</h1>
            <p style={{ color: '#6a8a6c', marginBottom: '36px' }}>
              Everything you need to know about SmartBites.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #d4ead6' }}>
                {resources.map((resource, idx) => (
                  <div key={idx} style={{
                    padding: '24px',
                    backgroundColor: 'white',
                    borderBottom: idx < resources.length - 1 ? '1px solid #d4ead6' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '24px'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px', color: '#1a2e1b', fontSize: '1rem' }}>{resource.title}</h3>
                      <p style={{ margin: 0, color: '#6a8a6c', fontSize: '0.9rem' }}>{resource.description}</p>
                    </div>
                    <a href={resource.link} target="_blank" rel="noreferrer" style={{
                      color: '#1a2e1b',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      borderBottom: '2px solid #a4e5aa'
                    }}>
                      {resource.linkText} →
                    </a>
                  </div>
                ))}
              </div>
            </div>
        </div>
    </div>
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

export default ResourcesPage;