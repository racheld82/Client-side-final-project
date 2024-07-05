import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import FamilyInList from './components/family/FamilyInLIst.jsx';
import LoginPage from './components/login/LoginPage.jsx';
import FamilyDetails from './components/family/FamilyDetails.jsx';
import FileUpload from './components/files/FileUpload.jsx';
import RegisterForm from './components/login/RegisterForm.jsx';
import SupportsDetails from './components/supports/SupportsDetails.jsx';
import MainPage from './MainPage.jsx';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterForm />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/families" element={<FamilyInList />} />
          <Route path="/supports" element={<SupportsDetails />} />
          <Route path="/family/:familyIndex" element={<FamilyDetails />} />
          <Route path="/family/:familyIndex/files" element={<FileUpload />} />
          <Route path='/upload' element={<FileUpload />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
