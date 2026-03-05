import { useState } from 'react';
import { Link } from 'react-router-dom';

function SnapPage() {
  //need this to see if AI generated the recipie yet before page extends
  const [recipeLoaded, setRecipeLoaded] = useState(false);

  const handleGenerateRecipe = () => {
  // think this is where AI API call will be
  //set to true temporarily
    setRecipeLoaded(true);
  };

  return (
      <div className="snap-layout">
        {/* left sidebar */}
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
                <span className="nav-text">My Recipes</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* main area */}
        <div className="snap-main-area">
          <div className="white-card">
            {!recipeLoaded ? (
              /* pre AI generation */
              <div className="card-content-wrapper">
                <div className="card-header">
                  <span className="back-arrow">←</span>
                  <div>
                    <h1>Snap</h1>
                    <p>Snap a photo of your fridge</p>
                  </div>
                </div>

                <div className="camera-display-area">
                  <div className="placeholder-graphic">
                  </div>
                </div>

                <div className="action-buttons">
                  {/* snap triggers the AI */}
                  <button className="btn-snap" onClick={handleGenerateRecipe}>
                    ✓ Snap
                  </button>
                  <button className="btn-upload">Upload</button>
                </div>
              </div>
            ) : (
              /* Shown post AI */
              <div className="card-content-wrapper">
                 <div className="card-header">
                  <span className="back-arrow" onClick={() => setRecipeLoaded(false)} style={{cursor: 'pointer'}}>←</span>
                  <div>
                    <h1>Suggested Dish</h1>
                    <p>Here is your AI-generated recipe based on your fridge!</p>
                  </div>
                </div>
                <div className="recipe-content-area">
                  <p>Recipe details will map out here...</p>
                </div>
                <div className="action-buttons">
                  <button className="btn-snap" onClick={() => setRecipeLoaded(false)}>Snap Another Photo</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  export default SnapPage;