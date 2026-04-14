import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SmartBitesLogo from '../assets/SmartBites_Logo.png';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [cuisinePreferences, setCuisinePreferences] = useState([]);

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Halal', 'Kosher', 'Soy-Free'];
  const cuisineOptions = ['Italian', 'American', 'Asian', 'Mexican', 'Indian', 'French', 'Japanese', 'Mediterranean', 'Thai', 'Middle Eastern'];

  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } 
    else {
      setList([...list, item]);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not logged in');
        return;
      }

      try {
        const res = await fetch('http://localhost:5001/auth/me/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok) {
          setProfile(data);
        } else {
          if (res.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('name');
          }
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const navbar = (
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
  );

  if (error) return (
    <div className="snap-layout">
      {navbar}
      <div className="snap-main-area">
        <div className="white-card" style={{ maxWidth: '500px', textAlign: 'center', padding: '48px' }}>
          <h2 style={{ color: '#1a2e1b', marginBottom: '16px' }}>Not logged in</h2>
          <p style={{ color: '#6a8a6c', marginBottom: '24px' }}>Please sign in to view your profile.</p>
          <Link to="/sign-in"><button className="btn-signin">Sign In</button></Link>
        </div>
      </div>
    </div>
  );

  if (!profile) return (
    <div className="snap-layout">
      {navbar}
      <div className="snap-main-area">
        <div className="white-card" style={{ maxWidth: '500px', textAlign: 'center' }}>
          <h2 style={{ color: '#1a2e1b', marginBottom: '16px' }}>Loading Profile...</h2>
        </div>
      </div>
    </div>
  );

  return (
    <div className="snap-layout">
      {navbar}
      <div className="snap-main-area">
        <div className="white-card" style={{ maxWidth: '700px' }}>
          <div className="card-content-wrapper">

            {/* profile header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '32px',
              paddingBottom: '24px',
              borderBottom: '1px solid #d4ead6'
            }}>
              <div>
                <h1 style={{ margin: '0 0 4px', color: '#1a2e1b', fontSize: '1.6rem' }}>
                  {profile.name}
                </h1>
                <p style={{ margin: 0, color: '#6a8a6c', fontSize: '0.9rem' }}>{profile.email}</p>
              </div>
            </div>

            {/* dietary restrictions */}
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ color: '#1a2e1b', marginBottom: '6px', fontSize: '1rem' }}>Dietary Restrictions</h3>
              <p style={{ color: '#6a8a6c', fontSize: '0.85rem', marginBottom: '12px' }}>Select all that apply — we'll use these when generating recipes.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {dietaryOptions.map(option => (
                  <button key={option} onClick={() => toggleItem(dietaryRestrictions, setDietaryRestrictions, option)} style={{
                    padding: '8px 16px',
                    borderRadius: '100px',
                    border: '1px solid',
                    borderColor: dietaryRestrictions.includes(option) ? '#1a2e1b' : '#d4ead6',
                    backgroundColor: dietaryRestrictions.includes(option) ? '#1a2e1b' : 'white',
                    color: dietaryRestrictions.includes(option) ? '#a4e5aa' : '#4a6a4c',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}>
                    {dietaryRestrictions.includes(option) ? '✓ ' : ''}{option}
                  </button>
                ))}
              </div>
            </div>

            {/* cuisine preferences */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: '#1a2e1b', marginBottom: '6px', fontSize: '1rem' }}>Cuisine Preferences</h3>
              <p style={{ color: '#6a8a6c', fontSize: '0.85rem', marginBottom: '12px' }}>What cuisines do you enjoy most?</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cuisineOptions.map(option => (
                  <button key={option} onClick={() => toggleItem(cuisinePreferences, setCuisinePreferences, option)} style={{
                    padding: '8px 16px',
                    borderRadius: '100px',
                    border: '1px solid',
                    borderColor: cuisinePreferences.includes(option) ? '#1a2e1b' : '#d4ead6',
                    backgroundColor: cuisinePreferences.includes(option) ? '#1a2e1b' : 'white',
                    color: cuisinePreferences.includes(option) ? '#a4e5aa' : '#4a6a4c',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}>
                    {cuisinePreferences.includes(option) ? '✓ ' : ''}{option}
                  </button>
                ))}
              </div>
            </div>

            {/* actions */}
            <div style={{
              display: 'flex',
              gap: '12px',
              paddingTop: '24px',
              borderTop: '1px solid #d4ead6'
            }}>
              <Link to="/my-recipes" style={{ flex: 1 }}>
                <button className="btn-signin" style={{ width: '100%', padding: '12px', borderRadius: '10px' }}>
                  My Recipes
                </button>
              </Link>
              <Link to="/sign-in" style={{ flex: 1 }}>
                <button style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #d4ead6',
                  backgroundColor: 'white',
                  color: '#6a8a6c',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                  Log Out
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;