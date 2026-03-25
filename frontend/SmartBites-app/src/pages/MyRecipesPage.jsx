import { useState } from 'react';
import { Link } from 'react-router-dom';

function MyRecipesPage({ recipes = [] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  //can change these eventually
  const filters = ['All', 'Chicken', 'Tofu', 'Salmon', 'Beef', 'Veggie'];

  //filter recipes
  const displayedRecipes = recipes.filter((recipe) => {
    if (activeFilter === 'All') return true;
    return recipe.ingredients && recipe.ingredients.includes(activeFilter);
  });

  return (
    <div className="snap-layout">
      <nav className="snap-sidebar">
        <div className="sidebar-top-icons">
          <div className="icon-menu">≡</div>
        </div>
        <ul className="sidebar-links">
          <li>
            <Link to="/snap">
              <span className="nav-text">Snap</span>
            </Link>
          </li>
          <li>
            <Link to="/explore">
              <span className="nav-text">Explore</span>
            </Link>
          </li>
          <li>
            <Link to="/my-recipes">
              <span className="nav-text" style={{ fontWeight: 'bold' }}>My Recipes</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* main area */}
      <div className="snap-main-area">
        <div className="white-card">
          <div className="card-content-wrapper" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <div className="card-header" style={{ marginBottom: '20px' }}>
              <Link to="/">
                <button className="button-snap">←</button>
              </Link>
              <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '15px' }}>
                <div>
                  <h1 style={{ margin: 0 }}>My Recipes</h1>
                </div>
                <div style={{ fontSize: '24px', cursor: 'pointer', fontWeight: 'bold' }}>⋮</div>
              </div>
            </div>

            {/* filters for recipes */}
            <div className="filter-container" style={{ display: 'flex', gap: '10px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '5px' }}>
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid #ccc',
                    backgroundColor: activeFilter === filter ? '#eaddff' : 'transparent',
                    color: activeFilter === filter ? '#21005d' : '#333',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                >
                  {activeFilter === filter && <span style={{ fontWeight: 'bold' }}>✓</span>}
                  {filter}
                </button>
              ))}
            </div>

            {/* recipe area */}
            {displayedRecipes.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
                <h3>No recipes found.</h3>
                <p>Go to the Snap page to generate some!</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '24px',
                overflowY: 'auto',
                paddingRight: '10px' //scrollbar
              }}>
                {displayedRecipes.map((recipe) => (
                  <div key={recipe.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                    {/* where the image will go */}
                    <div style={{
                      backgroundColor: '#f0eff3',
                      borderRadius: '16px',
                      aspectRatio: '1 / 1',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <div style={{ fontSize: '24px', color: '#ccc', display: 'flex', gap: '5px' }}>
                      </div>
                    </div>

                    {/* card Text */}
                    <div>
                      <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>{recipe.title}</h3>
                      <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Updated {recipe.updated}</p>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default MyRecipesPage;