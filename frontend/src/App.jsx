import { useState } from 'react'
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Offers from './pages/Offers';
import Newad from './pages/Newad';
import Homepage from './pages/Homepage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/newad" element={<Newad />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
