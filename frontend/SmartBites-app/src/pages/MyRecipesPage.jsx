import { useState } from 'react';
import { Link } from 'react-router-dom';

function MyRecipesPage({ recipes = [] }) {

  //need a state for recipes, loading and errors
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);
  const filters = ['All', 'Chicken', 'Tofu', 'Salmon', 'Beef', 'Veggie'];

  //uses effect!

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

      //return
      return (
        (recipe.ingredients && recipe.ingredients.some(ing => ing.toLowerCase().includes(filterTerm))) ||
        (recipe.title && recipe.title.toLowerCase().includes(filterTerm))
      );
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

            {/* if not signed in */}
            {displayedRecipes.length === 0 ? (
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
                      </div>
                    )}
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