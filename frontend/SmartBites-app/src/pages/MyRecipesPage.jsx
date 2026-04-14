import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SmartBitesLogo from '../assets/SmartBites_Logo.png';

function MyRecipesPage() {

  //need a state for recipes, loading and errors
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const [shareModalRecipe, setShareModalRecipe] = useState(null);
  const [postName, setPostName] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [shareLoading, setShareLoading] = useState(false);
  const [shareSuccess, setShareSuccess] = useState('');
  const [shareError, setShareError] = useState('');

  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);
  const filters = ['All', 'Chicken', 'Tofu', 'Salmon', 'Beef', 'Veggie'];

  const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

  //uses effect!
  useEffect(() => {
    const fetchMyRecipes = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please sign in to view your recipes.');
        setLoading(false);
        return;
      }

      try {
        // Calling your new backend route!
        const res = await fetch('http://localhost:5001/auth/my-recipes', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setRecipes(data); //gets the saved data
        } else {
          setError(data.error || 'Failed to fetch recipes.');
        }
      } catch (err) {
        setError('Could not connect to the server.');
      } finally {
        setLoading(false); //stop loading state
      }
    };

    fetchMyRecipes();
  }, []); //make sure page loads first

  const openShareModal = (recipe) => {
  setShareModalRecipe(recipe);
  setPostName(recipe.title || '');
  setPostDescription('');
  setShareSuccess('');
  setShareError('');
};

const closeShareModal = () => {
  setShareModalRecipe(null);
  setPostName('');
  setPostDescription('');
  setShareSuccess('');
  setShareError('');
};

const handleShare = async () => {
  if (!postName.trim() || !postDescription.trim()) {
    setShareError('Please fill in both fields.');
    return;
  }
  const token = localStorage.getItem('token');
  setShareLoading(true);
  setShareError('');
  try {
    const res = await fetch('http://localhost:5001/recipes/share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post_name: postName,
        description: postDescription,
        recipe: shareModalRecipe
      })
    });
    const data = await res.json();
    if (res.ok) {
      setShareSuccess('Recipe shared to Explore!');
      setTimeout(closeShareModal, 1500);
    } else {
      setShareError(data.error || 'Failed to share recipe.');
    }
  } catch (err) {
    setShareError('Could not connect to the server.');
  } finally {
    setShareLoading(false);
  }
};

  //includes fetched state now!
  const displayedRecipes = recipes.filter((recipe) => {
    if (activeFilter === 'All') return true;

    const filterTerm = activeFilter.toLowerCase();

    //everything not protein
    if (filterTerm === 'veggie') {
      const meatFilters = ['chicken', 'tofu', 'salmon', 'beef'];
      //check for filters
      const hasMeatOrTofu = recipe.ingredients?.some(ing =>
        meatFilters.some(meat => ing.toLowerCase().includes(meat))
      ) || meatFilters.some(meat => recipe.title.toLowerCase().includes(meat));

      return !hasMeatOrTofu;
    }

    return (
      (recipe.ingredients && recipe.ingredients.some(ing => ing.toLowerCase().includes(filterTerm))) ||
      (recipe.title && recipe.title.toLowerCase().includes(filterTerm))
    );
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

      {/* main area */}
      <div className="snap-main-area">
        <div className="white-card" style={{ maxWidth: '1200px', width: '100%', minHeight: '80vh' }}>
          <div className="card-content-wrapper" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <div className="card-header" style={{ marginBottom: '20px' }}>
              <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '15px' }}>
                <div>
                  <h1 style={{ margin: 0 }}>My Recipes</h1>
                </div>
              </div>
            </div>

            {/* filters */}
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

            {/* if not signed in / Loading states */}
            {loading ? (
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h3>Loading your recipes...</h3>
              </div>
            ) : error ? (
               <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
                <h3>{error}</h3>
              </div>
            ) : displayedRecipes.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
                <h3>No recipes found.</h3>
                <p>Go to the Snap page to generate some!</p>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                overflowY: 'auto',
                paddingRight: '10px'
              }}>
                {displayedRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    style={{
                      backgroundColor: '#f8f9fa',
                      borderRadius: '16px',
                      padding: '20px',
                      border: '1px solid #e0e0e0',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onClick={() => setExpandedRecipeId(expandedRecipeId === recipe.id ? null : recipe.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        {/* where the image will go */}
                        {/* card Text */}
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#1a1a1a' }}>{recipe.title}</h3>
                        <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>Saved on {recipe.updated}</p>
                      </div>
                      <div style={{ fontSize: '20px', color: '#666' }}>
                        {expandedRecipeId === recipe.id ? '▲' : '▼'}
                      </div>
                    </div>

                    {expandedRecipeId === recipe.id && (
                      <div style={{
                        marginTop: '20px',
                        paddingTop: '20px',
                        borderTop: '1px solid #e0e0e0',
                        cursor: 'default'
                      }}
                      onClick={(e) => e.stopPropagation()}
                      >
                        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', fontSize: '0.9rem', color: '#5f6368' }}>
                          <span><strong>Prep:</strong> {recipe.prep_time}</span>
                          <span><strong>Cook:</strong> {recipe.cook_time}</span>
                        </div>

                        <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#202124' }}>Ingredients:</h4>
                        <ul style={{ paddingLeft: '20px', margin: '0 0 15px 0', fontSize: '0.95rem', color: '#4a4a4a' }}>
                          {recipe.ingredients.map((ing, i) => (
                            <li key={i} style={{ marginBottom: '4px' }}>{ing}</li>
                          ))}
                        </ul>

                        <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#202124' }}>Instructions:</h4>
                        <ol style={{ paddingLeft: '20px', margin: '0', fontSize: '0.95rem', color: '#4a4a4a', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {recipe.instructions.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                        <button
                          onClick={() => openShareModal(recipe)}
                          style={{
                            marginTop: '16px',
                            padding: '10px 20px',
                            borderRadius: '20px',
                            border: 'none',
                            backgroundColor: '#6750a4',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}
                        >
                          + Add to Explore Page
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {shareModalRecipe && (
        <div style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '20px', padding: '32px',
            width: '90%', maxWidth: '460px', display: 'flex', flexDirection: 'column', gap: '16px'
          }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#1a1a1a' }}>Share to Explore</h2>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              Sharing: <strong>{shareModalRecipe.title}</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#333' }}>Post Name</label>
              <input
                type="text"
                value={postName}
                onChange={(e) => setPostName(e.target.value)}
                placeholder="Give your post a title..."
                style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #ccc', fontSize: '0.95rem', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#333' }}>Description</label>
              <textarea
                value={postDescription}
                onChange={(e) => setPostDescription(e.target.value)}
                placeholder="Tell others about this recipe..."
                rows={3}
                style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #ccc', fontSize: '0.95rem', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
              />
            </div>

            {shareError && <p style={{ color: 'red', margin: 0, fontSize: '0.9rem' }}>{shareError}</p>}
            {shareSuccess && <p style={{ color: 'green', margin: 0, fontSize: '0.9rem' }}>{shareSuccess}</p>}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={closeShareModal}
                style={{ padding: '10px 20px', borderRadius: '20px', border: '1px solid #ccc', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '14px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleShare}
                disabled={shareLoading}
                style={{
                  padding: '10px 20px', borderRadius: '20px', border: 'none',
                  backgroundColor: shareLoading ? '#b0a0d6' : '#6750a4',
                  color: 'white', cursor: shareLoading ? 'not-allowed' : 'pointer',
                  fontSize: '14px', fontWeight: '600'
                }}
              >
                {shareLoading ? 'Sharing...' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRecipesPage;