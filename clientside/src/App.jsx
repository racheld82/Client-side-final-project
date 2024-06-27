import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import FamilyInList from './components/FamilyInLIst'
import FamilyMain from './components/FamilyMain'

function App() {


  return (
    <>
      <Router>
            <Routes>
                <Route path="/" element={<FamilyInList />} />
                <Route path="/family/:familyIndex" element={<FamilyMain />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
