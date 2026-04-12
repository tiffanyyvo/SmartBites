import { useState } from 'react';
import { Link } from 'react-router-dom';
function ResourcesPage() {
  return (
    <div className="snap-main-area">
          <div className="white-card">
              <div className="card-content-wrapper">
                <div className="card-header">
                  <Link to="/">
                    <button className="button-snap">←</button>
                  </Link>
                  <div>
                    <h1>Resources</h1>
                    
                    <h2>
                      <label for="API"><b>GitHub: </b></label>
                      tiffanyyvo/SmartBites
                    </h2>

                    <h2>
                      <label for="API"><b>MongoDB: </b></label>
                      *Link MongoDB
                    </h2>

                    <h2>
                      <label for="API"><b>Generate Your Own Gemini API: </b></label>
                      *Link Gemini API
                    </h2>

                    <h2>
                      <Link to="/Contact">
                        <button className="button-snap">Submit a Question</button>
                      </Link>
                    </h2>
                  </div>
                </div>
        </div>
      </div>
    </div>
  );
}

export default ResourcesPage;