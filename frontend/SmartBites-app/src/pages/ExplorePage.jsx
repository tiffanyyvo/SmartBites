import { useState } from 'react';
import { Link } from 'react-router-dom';
import SmartBitesLogo from '../assets/Smartbites_logo.png';

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
                    <h1>Explore Other Users Recipes</h1>
                  </div>
                  
                </div>

                <div className="camera-display-area">
                  {/*this is where we will have some or no posts populated and then they 
                  will be updated and displayed whenever the user clicks on this area */}
                  <div className="feed-posts">
                    <div className="info">
                      <h1> Spaghetti Bolognese</h1>
                      <h2> Duration: 2 hours</h2>
                      <h2> spaghetti</h2>
                    </div>
                    <div className="feed-photos">
                      <img src={SmartBitesLogo} alt="SmartBites Logo" className="logo-img" />
                    </div>
                  </div>
                <div className="feed-posts">
                    <div className="info">
                      <h1> Spaghetti Bolognese</h1>
                      <h2> Duration: 2 hours</h2>
                      <h2> spaghetti</h2>
                    </div>
                </div>
                <div className="feed-posts">
                    <div className="info">
                      <h1> Spaghetti Bolognese</h1>
                      <h2> Duration: 2 hours</h2>
                      <h2> spaghetti</h2>
                    </div>
                </div>
                <div className="feed-posts">
                    <div className="info">
                      <h1> Spaghetti Bolognese</h1>
                      <h2> Duration: 2 hours</h2>
                      <h2> spaghetti</h2>
                    </div>
                </div>
                
                </div>
              </div>
      </div>
    </div>
  );
}

export default ExplorePage;