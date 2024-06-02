import { useState } from 'react'
import './App.css'
import Game from './pages/Game/Game'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="app">

    
      <Game/>
      </div>
    </>
  )
}

export default App
