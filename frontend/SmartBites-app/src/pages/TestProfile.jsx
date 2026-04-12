import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProfilePage() {
    return (
    <div className="snap-main-area">
        <div className="white-card">
            <div className="card-content-wrapper">
                <div className="card-header">
                    <Link to="/">
                    <button className="button-snap">←</button>
                    </Link>
                    <h1>Welcome *profile.name*!</h1>
                </div>
                <div className="card-header">
                    <p>Email: </p>
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