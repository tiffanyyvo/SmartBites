import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function SnapPage({ onAddRecipe }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recipeLoaded, setRecipeLoaded] = useState(false);
  
  // ADD THESE TWO NEW STATE VARIABLES:
  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [generatedRecipes, setGeneratedRecipes] = useState([]);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const onFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSnapClick = () => {
    cameraInputRef.current.click();
  };

  // REPLACE THIS ENTIRE FUNCTION:
  const handleGenerateRecipe = async () => {
    if (!selectedFile) {
      alert('Please select an image first!');
      return;
    }

    try {
      // Step 1: Analyze the fridge image
      const formData = new FormData();
      formData.append('image', selectedFile);

      const analyzeResponse = await fetch('http://localhost:5001/analyze-fridge', {
        method: 'POST',
        body: formData
      });

      const ingredientsData = await analyzeResponse.json();
      console.log('Detected ingredients:', ingredientsData);

      if (!ingredientsData.ingredients || ingredientsData.error) {
        alert('Failed to detect ingredients: ' + (ingredientsData.error || 'Unknown error'));
        return;
      }

      // Step 2: Generate recipes using the detected ingredients
      const recipeResponse = await fetch('http://localhost:5001/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: ingredientsData.ingredients,
          dietary_restrictions: [],
          cuisine_preference: null
        })
      });

      const recipeData = await recipeResponse.json();
      console.log('Generated recipes:', recipeData);

      if (recipeData.recipes && recipeData.recipes.length > 0) {
        // Store the recipes and ingredients to display
        setDetectedIngredients(ingredientsData.ingredients);
        setGeneratedRecipes(recipeData.recipes);
        setRecipeLoaded(true);
        
        // Optional: Send first recipe to "My Recipes"
        if (onAddRecipe && recipeData.recipes[0]) {
          onAddRecipe({
            id: Date.now(),
            title: recipeData.recipes[0].name,
            updated: 'Just now',
            ingredients: ingredientsData.ingredients
          });
        }
      } else {
        alert('Failed to generate recipes: ' + (recipeData.error || 'Unknown error'));
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process image: ' + error.message);
    }
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
                <Link to="/">
                  <button className="button-snap">←</button>
                </Link>
                <div>
                  <h1>Snap</h1>
                  <p>Snap a photo of your fridge</p>
                </div>
              </div>

              <div className="camera-display-area">
                <div className="placeholder-graphic">
                  {selectedFile ? (
                    <p>Selected: {selectedFile.name}</p>
                  ) : (
                    <p>No image selected</p>
                  )}
                </div>
              </div>

              <div className="action-buttons">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={onFileChange}
                  ref={cameraInputRef}
                  style={{ display: 'none' }}
                />

                <button className="btn-snap" onClick={handleSnapClick}>Snap</button>
                <button className="btn-upload" onClick={handleUploadClick}>Upload</button>
                <button className="btn-submit" onClick={handleGenerateRecipe}>
                  ✓ Submit</button>
              </div>
            </div>
          ) : (
            /* post AI - REPLACED SECTION */
            <div className="card-content-wrapper">
              <div className="card-header">
                <span className="back-arrow" onClick={() => {
                  setRecipeLoaded(false);
                  setSelectedFile(null);
                  setDetectedIngredients([]);
                  setGeneratedRecipes([]);
                }} style={{cursor: 'pointer'}}>←</span>
                <div>
                  <h1>Suggested Recipes</h1>
                  <p>Here are recipes based on your fridge!</p>
                </div>
              </div>

              {/* Show detected ingredients */}
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
                <h3>Detected Ingredients:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {detectedIngredients.map((ingredient, idx) => (
                    <span key={idx} style={{ 
                      padding: '5px 12px', 
                      backgroundColor: '#a4e5aa', 
                      borderRadius: '15px',
                      fontSize: '14px'
                    }}>
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Show generated recipes */}
              <div className="recipe-content-area" style={{ 
                overflow: 'auto', 
                padding: '20px',
                backgroundColor: 'white' 
              }}>
                {generatedRecipes.map((recipe, idx) => (
                  <div key={idx} style={{ 
                    marginBottom: '30px', 
                    padding: '20px', 
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px'
                  }}>
                    <h2>{recipe.name}</h2>
                    <p><strong>Prep:</strong> {recipe.prep_time} | <strong>Cook:</strong> {recipe.cook_time}</p>
                    
                    <h3>Ingredients:</h3>
                    <ul>
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                    
                    <h3>Instructions:</h3>
                    <ol>
                      {recipe.instructions.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>

              <div className="action-buttons">
                <button className="btn-snap" onClick={() => {
                  setRecipeLoaded(false);
                  setSelectedFile(null);
                  setDetectedIngredients([]);
                  setGeneratedRecipes([]);
                }}>Snap Another Photo</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SnapPage;