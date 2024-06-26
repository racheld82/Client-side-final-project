import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FamilyInList from './components/FamilyInLIst'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FamilyInList />
    </>
  )
}

export default App
