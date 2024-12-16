import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RecipeViewPage from './pages/RecipeViewPage';
import AddRecipePage from './pages/AddRecipePage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';


function App() {
  return (
    <Router>
      <div>
        <h1>My Recipe App</h1>
        <nav>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/logout">Logout</a></li>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/addRecipe">Add a new recipe</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </nav>

        {/* page routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recipes/:id" element={<RecipeViewPage />} />
          <Route path="/addRecipe" element={<AddRecipePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;