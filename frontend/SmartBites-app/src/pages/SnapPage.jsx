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
    <div style={{ display: 'flex' }}>
      {/* left side bar */}
      <nav style={{ marginRight: '20px' }}>
        <ul>
          <li><Link to="/snap">Snap</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/my-recipes">My Recipes</Link></li>
        </ul>
      </nav>

      {/* middle section */}
      <div>
        {!recipeLoaded ? (
          /* shown pre-AI */
          <div>
            <h2>Snap a photo of your fridge</h2>
            <div className="camera-placeholder" style={{ background: '#e0e0e0', padding: '50px' }}>
               <p>[Camera / Upload Area]</p>
            </div>
            <button onClick={handleGenerateRecipe}>Generate Recipe</button>
          </div>
        ) : (
          /* Shown post AI */
          <div>
            <h2>Suggested Dish</h2>
            <div className="recipe-content" style={{ background: '#f3e5f5', padding: '50px' }}>
              <p>Here is your AI-generated recipe based on your fridge!</p>
              {/* this is where recipie details should go */}
            </div>
            {/* if the user wants to take another fridge pic*/}
            <button onClick={() => setRecipeLoaded(false)}>Snap Another Photo</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SnapPage;