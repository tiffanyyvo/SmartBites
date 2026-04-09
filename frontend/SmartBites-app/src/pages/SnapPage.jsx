import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function SnapPage({ onAddRecipe }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recipeLoaded, setRecipeLoaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleGenerateRecipe = async () => {
    if (!selectedFile) {
      alert('Please select an image first!');
      return;
    }

    setIsGenerating(true);

    try {
      // Step 1: Analyze the fridge image
      const formData = new FormData();
      formData.append('image', selectedFile);

      const analyzeResponse = await fetch('http://localhost:5001/analyze-fridge', {
        method: 'POST',
        body: formData
      });

      const ingredientsData = await analyzeResponse.json();

      if (!ingredientsData.ingredients || ingredientsData.error) {
        alert('Failed to detect ingredients: ' + (ingredientsData.error || 'Unknown error'));
        setIsGenerating(false);
        return;
      }

      // Step 2: Generate recipes
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

      if (recipeData.recipes && recipeData.recipes.length > 0) {
        setDetectedIngredients(ingredientsData.ingredients);
        setGeneratedRecipes(recipeData.recipes);
        setRecipeLoaded(true);
      } else {
        alert('Failed to generate recipes: ' + (recipeData.error || 'Unknown error'));
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process image: ' + error.message);
    } finally {
      setIsGenerating(false);
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

              {/* UPDATED CAMERA DISPLAY AREA FOR IMAGE PREVIEW */}
              <div className="camera-display-area" style={{
                minHeight: '250px',
                backgroundColor: '#f0eff3',
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                marginBottom: '20px'
              }}>
                <div className="placeholder-graphic" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Fridge preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <p style={{ color: '#666' }}>No image selected</p>
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

                <button className="btn-snap" onClick={handleSnapClick} disabled={isGenerating}>Snap</button>
                <button className="btn-upload" onClick={handleUploadClick} disabled={isGenerating}>Upload</button>
                <button className="btn-submit" onClick={handleGenerateRecipe} disabled={isGenerating}>
                  {isGenerating ? 'Analyzing...' : '✓ Submit'}
                </button>
              </div>
            </div>
          ) : (
            /* post AI */
            <div className="card-content-wrapper">
              <div className="card-header">
                <span className="back-arrow" onClick={() => {
                  setRecipeLoaded(false);
                  setSelectedFile(null);
                  setDetectedIngredients([]);
                  setGeneratedRecipes([]);
                }} style={{cursor: 'pointer', fontSize: '24px', marginRight: '15px'}}>←</span>
                <div>
                  <h1>Suggested Recipes</h1>
                  <p>Here are recipes based on your fridge!</p>
                </div>
              </div>

              {/* Show detected ingredients */}
              <div className="ingredients-container" style={{
                marginBottom: '20px',
                padding: '15px 20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px'
              }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>Detected Ingredients:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {detectedIngredients.map((ingredient, idx) => (
                    <span key={idx} style={{
                      padding: '6px 14px',
                      backgroundColor: '#e6f4ea',
                      color: '#137333',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Show generated recipes */}
              <div className="recipe-cards-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                padding: '5px'
              }}>
                {generatedRecipes.map((recipe, idx) => (
                  <div key={idx} className="recipe-card" style={{
                    padding: '20px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <h2 style={{
                      marginTop: '0',
                      fontSize: '1.5rem',
                      color: '#202124',
                      lineHeight: '1.2'
                    }}>
                      {recipe.name}
                    </h2>

                    <div style={{
                      display: 'flex',
                      gap: '15px',
                      marginBottom: '15px',
                      fontSize: '0.9rem',
                      color: '#5f6368'
                    }}>
                      <span><strong>Prep:</strong> {recipe.prep_time}</span>
                      <span><strong>Cook:</strong> {recipe.cook_time}</span>
                    </div>

                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#202124' }}>Ingredients:</h3>
                    <ul style={{
                      paddingLeft: '20px',
                      margin: '0 0 15px 0',
                      fontSize: '0.95rem',
                      color: '#4a4a4a'
                    }}>
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>{ing}</li>
                      ))}
                    </ul>

                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#202124' }}>Instructions:</h3>
                    <ol style={{
                      paddingLeft: '20px',
                      margin: '0',
                      fontSize: '0.95rem',
                      color: '#4a4a4a',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      flexGrow: 1
                    }}>
                      {recipe.instructions.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>

                    <button
                      style={{
                        marginTop: '20px',
                        padding: '10px',
                        backgroundColor: '#e6f4ea',
                        color: '#137333',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s'
                      }}
                      onClick={(e) => {
                        if (onAddRecipe) {
                          onAddRecipe({
                            id: Date.now() + idx,
                            title: recipe.name,
                            updated: new Date().toLocaleDateString(),
                            ingredients: recipe.ingredients,
                            instructions: recipe.instructions,
                            prep_time: recipe.prep_time,
                            cook_time: recipe.cook_time
                          });
                          e.target.innerText = '✓ Saved to My Recipes';
                          e.target.style.backgroundColor = '#dcece0';
                          e.target.disabled = true;
                        }
                      }}
                    >
                      Save Recipe
                    </button>
                  </div>
                ))}
              </div>

              <div className="action-buttons" style={{
                marginTop: '30px',
                paddingBottom: '20px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <button className="btn-snap" style={{
                  backgroundColor: '#5f6368',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600'
                }} onClick={() => {
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