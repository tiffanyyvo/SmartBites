import { useState } from 'react';
import { Link } from 'react-router-dom';

function ExplorePage() {
  
  return (
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
                      <Link to="/snap">
                          <button className="btn-signin">Make a Post</button>
                      </Link>
                    </div>
                  </nav>

                  <div>
                    <h1>Eplore Other Users Recipes</h1>
                  </div>
                  
                </div>

                <div className="camera-display-area">
                <div className="placeholder-graphic">
                </div>
                </div>
              </div>
      </div>
    </div>
  );
}

export default ExplorePage;