import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import FamilyInList from './components/FamilyInLIst.jsx';
import LoginPage from './components/LoginPage.jsx';
import FamilyDetails from './components/FamilyDetails.jsx';
import FileUpload from './components/FileUpload.jsx';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/families" element={<FamilyInList />} />
          <Route path="/family/:familyIndex" element={<FamilyDetails />} />
          <Route path="/family/:familyIndex/files" element={<FileUpload />} />
          <Route path='/upload' element={<FileUpload />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
