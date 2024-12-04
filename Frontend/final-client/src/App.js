
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LandingPage from './components/Homepage';
import RecipeView from './components/RecipeView';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/recipe/1" className="nav-link">Recipe 1</Link>
            <Link to="/recipe/2" className="nav-link">Recipe 2</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/recipe/:id" element={<RecipeView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
