import { useState } from 'react'
import reactLogo from './assets/react.svg'
import SmartBitesLogo from './assets/SmartBites_logo.png'
import './App.css'
import Home from './Home.jsx'
import { Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <p className="nav_temp">
          <a href="https://github.com/tiffanyyvo/SmartBites.git" target="_blank">
            <img src={SmartBitesLogo} className="logo" alt="SB logo" />
          </a>
        </p>
        <p className="header_block">
            {/* link to our github when click on logo*/}
            <p className="titles">
              <h1>Welcome to SmartBites</h1>
              <h2>Interactive way to eat better with what you have</h2>
            </p>
        </p> 
      </div>
      {/*<div className="button">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>*/}
      <p className="titles">
        Savannah Ogletree, Mia Burns, Tiffany Vo, Salena Till, and Leah Jones
      </p>
      <p className="create_button">
            {/* link to our github when click on logo*/}
            <p className="titles">
              <h1>Create with me</h1>
            </p>
      </p>

        <p className="search_button">
            {/* link to our github when click on logo*/}
            <p className="titles">
              <h1>Search for more</h1>
            </p>
        </p>

        <p className="share_button">
            {/* link to our github when click on logo*/}
            <p className="titles">
              <h1>Share with other users</h1>
            </p>
        </p>

        <p className="login_button">
            {/* link to our github when click on logo*/}
            <p className="login_words">
              login
            </p>
        </p>
    </>
  )
}

export default App

{/*
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </BrowserRouter>
  */}