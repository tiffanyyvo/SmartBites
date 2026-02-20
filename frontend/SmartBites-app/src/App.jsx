import { useState } from 'react'
import reactLogo from './assets/react.svg'
import SmartBitesLogo from './assets/SmartBites_logo.png'
import './App.css'

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
      {/*<div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>*/}
      <p className="titles">
        Savannah Ogletree, Mia Burns, Tiffany Vo, Salena Till, and Leah Jones
      </p>
    </>
  )
}

export default App
