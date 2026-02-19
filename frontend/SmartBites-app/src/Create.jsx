import { useState } from 'react'
import reactLogo from './assets/react.svg'
import SmartBitesLogo from './assets/SmartBites_logo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={SmartBitesLogo} className="logo" alt="SB logo" />
        </a>
      </div>
      <p className="titles">
        <h1>Welcome to SmartBites</h1>
        <h2>Interactive way to eat better with what you have</h2>
      </p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Savannah Ogletree, Mia Burns, Tiffany Vo, Salena Till, and Leah Jones
      </p>
    </>
  )
}

export default App
