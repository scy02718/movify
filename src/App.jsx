import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import About from './pages/About'
import Discussions from './pages/Discussions'
import MovieDetails from './pages/MovieDetails'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/discussions' element={<Discussions />} />
        <Route path='/movie/:movieId' element={<MovieDetails />} />
      </Routes>
    </Router>
  )
}

export default App