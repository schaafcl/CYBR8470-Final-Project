import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import RecipePage from './components/RecipePage';

function App() {
  return (
    <Router>
      <div>
        <h1>My Recipe App</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/recipes">Recipes</a></li>
          </ul>
        </nav>

        {/* Define your routes here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recipes" element={<RecipePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;