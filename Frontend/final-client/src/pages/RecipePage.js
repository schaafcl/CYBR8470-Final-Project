import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from '../components/RecipeSearchBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RecipeDetails from '../components/RecipeDetails';
import HomePage from './HomePage';

const RecipePage = () => {
  return (
    <Router>
      <div>
        <h1>Recipe Search</h1>
        <Routes>
          <Route path="/recipe/:id" component={RecipeDetails} />
          <Route path="/" exact component={HomePage} />
        </Routes>
      </div>
    </Router>
  );
};


  
  export default RecipePage;