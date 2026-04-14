import { useState } from 'react';
import { Link } from 'react-router-dom';
import SmartBitesLogo from '../assets/Smartbites_logo.png';

function ExplorePage() {
  
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
    <div className="snap-main-area">
          <div className="white-card">
              <div className="card-content-wrapper">
                <div className="card-header">
                  <Link to="/">
                    <button className="button-snap">←</button>
                  </Link>

                  <nav>
                    <div className="nav-actions">
                      {/* sign in goes to snap for now, until sign in is implemented*/}
                      <Link to="/my-recipes">
                          <button className="btn-signin">Make a Post</button>
                      </Link>
                    </div>
                  </nav>

                  <div>
                    <h1>Explore Other Users Recipes</h1>
                  </div>
                  
                </div>

                <div className="recipe-grid">
                  {/*this is where we will have some or no posts populated and then they 
                  will be updated and displayed whenever the user clicks on this area */}
                  <div className="feed-card">
                      <h1> Spaghetti Bolognese</h1>
                      <h4> By: Savannah Ogletree</h4>
                      <h2> Super easy Spaghetti recipe and I wanted to share!</h2>
                      <div className="image-placeholder">
                        <img src={SmartBitesLogo} alt="SmartBites Logo" className="logo-img" />
                      </div>
                      {/* needs to be updated to find the recipe that is being talked about in the post*/}
                      <Link to="/my-recipes">
                          <button className="btn-signin">View Recipe</button>
                      </Link>
                  </div>
                  <div className="feed-card">
                      <h1> Spaghetti Bolognese</h1>
                      <h4> By: Savannah Ogletree</h4>
                      <h2> Super easy Spaghetti recipe and I wanted to share!</h2>
                      <div className="image-placeholder">
                        <img src={SmartBitesLogo} alt="SmartBites Logo" className="logo-img" />
                      </div>
                      <Link to="/my-recipes">
                          <button className="btn-signin">View Recipe</button>
                      </Link>
                  </div>
                </div>
              </div>
      </div>
    </div>
    </div>
  );
}

export default ExplorePage;