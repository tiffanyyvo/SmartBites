import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SmartBitesLogo from '../assets/Smartbites_logo.png';

function ExplorePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedPostIndex, setExpandedPostIndex] = useState(null);

  useEffect(() => {
    const fetchExplorePosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please sign in to view the Explore page.');
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('http://localhost:5001/recipes/explore', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setPosts(data);
        } else {
          setError(data.error || 'Failed to load posts.');
        }
      } catch (err) {
        setError('Could not connect to the server.');
      } finally {
        setLoading(false);
      }
    };
    fetchExplorePosts();
  }, []);

  return (
    <div className="snap-main-area">
      <div className="white-card">
        <div className="card-content-wrapper">
          <div className="card-header">
            <Link to="/"><button className="button-snap">←</button></Link>
            <nav>
              <div className="nav-actions">
                <Link to="/snap"><button className="btn-signin">Make a Post</button></Link>
              </div>
            </nav>
            <div><h1>Explore Other Users' Recipes</h1></div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '50px' }}><h3>Loading posts...</h3></div>
          ) : error ? (
            <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}><h3>{error}</h3></div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
              <h3>No posts yet.</h3>
              <p>Be the first to share a recipe from My Recipes!</p>
            </div>
          ) : (
            <div className="recipe-grid">
              {posts.map((post, index) => (
                <div className="feed-card" key={index}>
                  <h1>{post.post_name}</h1>
                  <h4>By: {post.shared_by}</h4>
                  <h2>{post.description}</h2>
                  <div className="image-placeholder">
                    <img src={SmartBitesLogo} alt="SmartBites Logo" className="logo-img" />
                  </div>
                  <button
                    className="btn-signin"
                    onClick={() => setExpandedPostIndex(expandedPostIndex === index ? null : index)}
                  >
                    {expandedPostIndex === index ? 'Hide Recipe' : 'View Recipe'}
                  </button>

                  {expandedPostIndex === index && post.recipe && (
                    <div style={{ marginTop: '16px', textAlign: 'left' }}>
                      <div style={{ display: 'flex', gap: '15px', marginBottom: '10px', fontSize: '0.85rem', color: '#5f6368' }}>
                        <span><strong>Prep:</strong> {post.recipe.prep_time}</span>
                        <span><strong>Cook:</strong> {post.recipe.cook_time}</span>
                      </div>
                      <h4 style={{ marginBottom: '6px' }}>Ingredients:</h4>
                      <ul style={{ paddingLeft: '18px', margin: '0 0 12px 0', fontSize: '0.9rem' }}>
                        {post.recipe.ingredients?.map((ing, i) => <li key={i}>{ing}</li>)}
                      </ul>
                      <h4 style={{ marginBottom: '6px' }}>Instructions:</h4>
                      <ol style={{ paddingLeft: '18px', margin: 0, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {post.recipe.instructions?.map((step, i) => <li key={i}>{step}</li>)}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;