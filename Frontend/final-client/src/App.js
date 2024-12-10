import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RecipePage from './pages/RecipePage';
import AddRecipePage from './pages/AddRecipePage';


function App() {
  return (
    <Router>
      <div>
        <h1>My Recipe App</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/addRecipe">Add a new recipe</a></li>
          </ul>
        </nav>

        {/* Define your routes here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recipes/:id" element={<RecipePage />} />
          <Route path="/addRecipe" element={<AddRecipePage />} />
           
        </Routes>
      </div>
    </Router>
  );
}

export default App;