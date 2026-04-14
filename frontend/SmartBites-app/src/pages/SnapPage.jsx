import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SmartBitesLogo from '../assets/Smartbites_logo.png';

function SnapPage({ onAddRecipe }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recipeLoaded, setRecipeLoaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [generatedRecipes, setGeneratedRecipes] = useState([]);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

  const onFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setErrorMessage('');
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
      setErrorMessage('Please add a photo before submitting!');
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
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/"><img src={SmartBitesLogo} alt="SmartBites Logo" className="logo-img" /></Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/snap">Snap</Link></li>
          <li><Link to="/my-recipes">My Recipes</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="nav-actions">
          <Link to="/profile"><button className="btn-signin">Profile</button></Link>
        </div>
      </nav>

      {/* main area */}
      <div className="snap-main-area">
        <div className="white-card" style={recipeLoaded ? { maxWidth: '1300px' } : {}}>
          {!recipeLoaded ? (
            /* pre AI generation */
            <div className="card-content-wrapper">
              <div className="card-header">
                <div>
                  <p style={{ color: '#1a2e1b', fontWeight: '600', fontSize: '1.3rem' }}>Snap a photo of your ingredients!</p>
                </div>
              </div>

              {/* UPDATED CAMERA DISPLAY AREA FOR IMAGE PREVIEW */}
              <div className="camera-display-area" onClick={() => !isGenerating && setShowModal(true)} style={{
                cursor: isGenerating ? 'default' : 'pointer',
                minHeight: '400px',
                backgroundColor: '#f0eff3',
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                marginBottom: '20px',
                position: 'relative'
              }}>
                <div className="placeholder-graphic" style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  pointerEvents: 'none' 
                }}>
                  {selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Fridge preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <p style={{ color: '#666' }}>Click to add a photo</p>
                  )}
                </div>

                {/* loading overlay */}
                {isGenerating && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(255,255,255,0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    borderRadius: '16px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      border: '4px solid #e8f5e9',
                      borderTop: '4px solid #1a2e1b',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    <p style={{ color: '#1a2e1b', fontWeight: '500', margin: 0 }}>Analyzing your ingredients...</p>
                    <p style={{ color: '#6a8a6c', fontSize: '13px', margin: 0 }}>This may take a few seconds</p>
                  </div>
                )}
              </div>

                            {showModal && (
                              <div style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0,0,0,0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1000
                                }} onClick={() => setShowModal(false)}>
                                <div style={{
                                  background: 'white',
                                  borderRadius: '20px',
                                  padding: '40px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '16px',
                                  minWidth: '280px',
                                  alignItems: 'center'
                                }} onClick={e => e.stopPropagation()}>
                                  <h3 style={{ margin: '0 0 8px', color: '#1a2e1b' }}>Add a photo</h3>
                                  <button className="btn-snap" style={{ width: '100%' }} onClick={() => {
                                    handleSnapClick();
                                    setShowModal(false);
                                  }}>Snap</button>
                                  <button className="btn-upload" style={{ width: '100%' }} onClick={() => {
                                    handleUploadClick();
                                    setShowModal(false);
                                  }}>Upload</button>
                                  <button style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#6a8a6c',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                  }} onClick={() => setShowModal(false)}>Cancel</button>
                                </div>
                              </div>
                          )}
              {errorMessage && (
                <p style={{
                  color: '#991b1b',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fca5a5',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  textAlign: 'center',
                  marginBottom: '12px'
                }}>{errorMessage}</p>
              )}
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
                  <p>Here are recipes based on your provided ingredients!</p>
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
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      backgroundColor: '#1a2e1b',
                      padding: '24px 20px',
                      marginBottom: '0'
                    }}>
                      <h2 style={{
                        margin: '0 0 8px',
                        fontSize: '1.4rem',
                        color: 'white',
                        lineHeight: '1.2'
                      }}>{recipe.name}</h2>
                      <div style={{
                        display: 'flex',
                        gap: '15px',
                        fontSize: '0.85rem',
                        color: '#a4e5aa'
                      }}>
                        <span>Prep: {recipe.prep_time}</span>
                        <span>Cook: {recipe.cook_time}</span>
                      </div>
                    </div>
                    <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

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

                    <button className="btn-save-recipe" onClick={async (e) => {
                        const token = localStorage.getItem('token');

                        if (!token) {
                          alert('Please log in to save recipes!');
                          return;
                        }

                        const recipeToSave = {
                          id: Date.now() + idx,
                          title: recipe.name,
                          updated: new Date().toLocaleDateString(),
                          ingredients: recipe.ingredients,
                          instructions: recipe.instructions,
                          prep_time: recipe.prep_time,
                          cook_time: recipe.cook_time
                        };

                        try {
                          //call backend route
                          const response = await fetch('http://localhost:5001/auth/save-recipe', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}` // This proves who the user is
                            },
                            body: JSON.stringify(recipeToSave)
                          });

                          if (response.ok) {
                            e.target.innerText = '✓ Saved to My Recipes';
                            e.target.style.backgroundColor = '#dcece0';
                            e.target.disabled = true;

                            //keeps local state
                            if (onAddRecipe) onAddRecipe(recipeToSave);
                          } else {
                            alert('Failed to save recipe to database.');
                          }
                        } catch (error) {
                          console.error("Error saving recipe:", error);
                        }
                      }}
                  >
                      Save Recipe
                    </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="action-buttons" style={{
                marginTop: '30px',
                paddingBottom: '20px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <button className="btn-snap-another-recipe" onClick={() => {
                  
                
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
      <footer className="footer-section">
                <div className="footer-columns">
                  <div className="footer-col">
                    <h4>Our Design</h4>
                    <ul>
                      <li>Design</li>
                      <li>Resources</li>
                      <li>Development features</li>
                    </ul>
                  </div>
                  <div className="footer-col">
                    <h4>About Us</h4>
                    <ul>
                      <li>Meet our Team</li>
                      <li>Contact Us</li>
                      <li>FAQs</li>
                    </ul>
                  </div>
                </div>
                <div className="footer-upload" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
                  <span className="upload-icon">↑</span>
                </div>
              </footer>
    </div>
  );
}

export default SnapPage;