import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import FamilyInList from './components/FamilyInList.jsx'
import LoginPage from './components/LoginPage';
import FamilyDetails from './components/FamilyDetails';

function App() {


  return (
    <>
      <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/families" element={<FamilyInList />} />
                <Route path="/families/:familyIndex" element={<FamilyDetails />} />
                
            </Routes>
        </Router>
    </>
  )
}

export default App
