import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not logged in');
        return;
      }

      try {
        const res = await fetch('http://localhost:5001/api/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.ok) setProfile(data);
        else setError(data.error);
      } catch (err) {
        setError('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div className="snap-main-area"><div className="white-card"><div className="card-content-wrapper"><div className="card-header">
    <Link to="/">
    <button className="button-snap">←</button>
    </Link>
    <h2>{error}</h2>
    <Link to="/register">
    <button className="button-snap">Create Profile</button>
    </Link>
    </div></div></div></div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <p>Email: {profile.email}</p>
      {/* do we need any more componenets?? */}
    </div>
  );
}

export default ProfilePage;