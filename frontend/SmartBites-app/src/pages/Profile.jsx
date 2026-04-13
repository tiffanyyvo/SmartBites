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
    <div className="snap-main-area">
        <div className="white-card">
            <div className="card-content-wrapper">
                <div className="card-header">
                    <Link to="/">
                    <button className="button-snap">←</button>
                    </Link>
                    <h1>Welcome {profile.name}!</h1>
                </div>
                <div className="card-header">
                    <p>Email: {profile.email}</p>
                </div>
                <div className="card-header">
                    <Link to="/my-recipes">
                    <button className="button-snap">Go to My Recipes</button>
                    </Link>
                </div>
                <div className="card-header">
                    <Link to="/sign-in">
                    <button className="btn-signin">Log Out</button>
                    {/*add functionality to log out*/}
                    </Link>
                </div>
            </div>
        </div>
    </div>  
  );
}

export default ProfilePage;