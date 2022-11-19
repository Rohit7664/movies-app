import React from 'react';
import './App.css';
import Banner from './components/Banner';
import Favouritte from './components/Favouritte';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Banner/>
        <Routes>
          <Route path="/" element={<Movies/>} />

          <Route path='/favourite' element={<Favouritte />} />
        </Routes>

      </Router>
    </React.Fragment>
  );
}

export default App;
