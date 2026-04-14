import { useState } from 'react';
import { Link } from 'react-router-dom';
import SmartBitesLogo from '../assets/Smartbites_logo.png';

function ExplorePage() {
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const filters = ['All', 'Chicken', 'Tofu', 'Salmon', 'Beef', 'Veggie'];

  const posts = [
    { id: 1, title: 'Spaghetti Bolognese', author: 'Savannah Ogletree', description: 'Super easy Spaghetti recipe and I wanted to share!', image: SmartBitesLogo },
    { id: 2, title: 'Salmon Fillet', author: 'Salena Till', description: 'Super easy Salmon recipe that hit the spot!', image: SmartBitesLogo },
  ];

  const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

  const displayedPosts = posts.filter((post) => {
    if (activeFilter === 'All') return true;
    const filterTerm = activeFilter.toLowerCase();
    return post.title.toLowerCase().includes(filterTerm) ||
      post.description.toLowerCase().includes(filterTerm);
  });

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
    <div className="snap-main-area" style={{ padding: '20px' }}>
          <div className="white-card" style={{ maxWidth: '1200px', width: '100%', minHeight: '80vh' }}>
              <div className="card-content-wrapper">
                {/* header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <div>
                    <h1 style={{ margin: '0 0 4px', color: '#1a2e1b' }}>Explore</h1>
                    <p style={{ margin: 0, color: '#6a8a6c', fontSize: '0.9rem' }}>Discover recipes shared by the SmartBites community</p>
                  </div>
                  <Link to="/snap">
                    <button className="btn-signin">+ Make a Post</button>
                  </Link>
                </div>

            <div style={{ borderBottom: '1px solid #d4ead6', margin: '20px 0 28px' }} />
                {/* filter dropdown */}
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                  <button
                    onClick={() => setShowFilter(!showFilter)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '9px 18px',
                      borderRadius: '100px',
                      border: '1px solid #d4ead6',
                      backgroundColor: activeFilter !== 'All' ? '#1a2e1b' : 'white',
                      color: activeFilter !== 'All' ? 'white' : '#1a2e1b',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Filter {activeFilter !== 'All' ? `· ${activeFilter}` : ''} {showFilter ? '▲' : '▼'}
                  </button>

                  {showFilter && (
                    <div style={{
                      position: 'absolute',
                      top: '44px',
                      left: 0,
                      backgroundColor: 'white',
                      border: '1px solid #d4ead6',
                      borderRadius: '16px',
                      padding: '8px',
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      minWidth: '160px',
                      boxShadow: '0 4px 16px rgba(26,46,27,0.1)'
                    }}>
                      {filters.map(filter => (
                        <button
                          key={filter}
                          onClick={() => { setActiveFilter(filter); setShowFilter(false); }}
                          style={{
                            padding: '9px 16px',
                            borderRadius: '10px',
                            border: 'none',
                            backgroundColor: activeFilter === filter ? '#edf9ee' : 'transparent',
                            color: activeFilter === filter ? '#1a2e1b' : '#4a6a4c',
                            fontWeight: activeFilter === filter ? '600' : '400',
                            fontSize: '14px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'background-color 0.2s'
                          }}
                        >
                          {activeFilter === filter ? '✓ ' : ''}{filter}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              {/* recipe grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
              }}>
              {posts.map(post => (
                <div key={post.id} style={{
                  border: '1px solid #d4ead6',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'box-shadow 0.2s'
                }}>
                  {/* image area */}
                  <div style={{
                    height: '180px',
                    backgroundColor: '#edf9ee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    <img src={SmartBitesLogo} alt="recipe" style={{ height: '80px', opacity: 0.4 }} />
                  </div>

                  {/* card body */}
                  <div style={{ padding: '16px 20px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1a2e1b', fontWeight: '700' }}>{post.title}</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#a4e5aa', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      By {post.author}
                    </p>
                    <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: '#6a8a6c', lineHeight: '1.5', flexGrow: 1 }}>
                      {post.description}
                    </p>
                  </div>

                  {/* card footer */}
                  <div style={{ padding: '12px 20px', borderTop: '1px solid #d4ead6' }}>
                    <Link to="/my-recipes">
                      <button className="btn-signin" style={{ width: '100%', borderRadius: '10px', padding: '10px' }}>
                        View Recipe
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {posts.length === 0 && (
              <div style={{ textAlign: 'center', marginTop: '60px', color: '#6a8a6c' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>No posts yet.</p>
                <p style={{ fontSize: '0.9rem' }}>Be the first to share a recipe!</p>
                <Link to="/snap">
                  <button className="btn-signin" style={{ marginTop: '16px' }}>+ Make a Post</button>
                </Link>
              </div>
            )}
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

export default ExplorePage;