import { useState } from 'react';
import { Link } from 'react-router-dom';

import user_logo from '../assets/user.png';
import email_logo from '../assets/email.png';
import password_logo from '../assets/password.png';

function SignInPage() {
  
  const [action, setAction] = useState("Sign Up");

  return (
    <div>
      <div className="snap-main-area">
        <div className="white-card-signin">
          <div className="card-content-wrapper">
                <div className="card-header">
                  <Link to="/">
                    <button className="button-snap">←</button>
                  </Link>
                  <div>
                    <h1>{action}</h1>
                    <p>Use your log in credentials to access your account</p>
                  </div>
                </div>
              <div className="inputs">
                {action==="Login"?<div></div>:<div className="input">
                  <img src={user_logo} alt="" style={{ height:20, width:20}} />
                  <input type="name" placeholder="Name"/>
                </div>}
          
                <div className="input">
                  <img src={email_logo} alt="" style={{ height:20, width:20}} />
                  <input type="email" placeholder="Email"/>
                </div>
                <div className="input">
                  <img src={password_logo} alt="" style={{ height:20, width:20}} />
                  <input type="password" placeholder="Password"/>
                </div>
              </div>
              <div className="submit-container">
                <div className={action=="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action=="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
              </div>
            </div>
        </div>
      </div>


    </div>
  );
  
}

export default SignInPage;

{/*<a href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Freepik - Flaticon</a>*/}