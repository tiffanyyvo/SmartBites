import { useState } from 'react';
import { Link } from 'react-router-dom';

function SnapPage({ onAddRecipe }) {
  //need this to see if AI generated the recipie yet before page extends
  //https://www.geeksforgeeks.org/reactjs/file-uploading-in-react-js/
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (event) => {
    // Store the first file from the selection
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
  };


  const [recipeLoaded, setRecipeLoaded] = useState(false);

  const handleGenerateRecipe = () => {
  // think this is where AI API call will be
  //set to true temporarily

    //fake recipe sample
    const aiGeneratedRecipe = {
      id: Date.now(),
      title: 'AI Suggested Chicken Bowl',
      updated: 'Just now',
      ingredients: ['Chicken', 'Veggie']
    };

    //sends to app
    if (onAddRecipe) {
      onAddRecipe(aiGeneratedRecipe);
    }

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
                  </div>
                </div>

                <div className="action-buttons">
                  {/* upload triggers the AI, snap should trigger the camera to pop up*/}
                  <input type="file" onChange={onFileChange} />
                  <button className="btn-snap">Snap</button>
                  <button className="btn-upload" onClick={onFileUpload}>Upload</button>
                  <button className="btn-submit" onClick={handleGenerateRecipe}>
                    ✓ Submit</button>
                </div>
              </div>
            ) : (
              /*post AI */
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