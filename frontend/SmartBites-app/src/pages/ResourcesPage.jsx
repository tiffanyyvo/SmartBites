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
                    
                    <p>
                      <label for="API"><b>API: </b></label>
                      Link
                    </p>

                    <p>
                      <label for="password"><b>FAQ: </b></label>
                      FAQs *Link to the FAQ question
                    </p>

                    <p>
                      <label for="password"><b>Submit a Question </b></label>
                      Link*
                    </p>
                  </div>
                </div>
        </div>
      </div>
    </div>
  );
}

export default ResourcesPage;