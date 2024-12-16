import React, { useState } from 'react';
import SearchBar from '../components/RecipeSearchBar';
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import '../styles.css';


// Main homepage.  Holds navigation links for the other pages, the search bar component for searching/filtering results, and the search results after searching
const HomePage = () => {

  // state to track the recipes for the search/filter results
  const [recipes, setRecipes] = useState([]);

  // handles the search event, when the search button is clicked
  const handleSearch = async (searchTerm) => {
    

    //const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;


    try {
      // sanitize the search bar input before attepting to search for it
      const sanitizedSearchTerm = DOMPurify.sanitize(searchTerm)
      // jwt authentication for search results
      const token = localStorage.getItem('access_token')
      console.log("token at homepage:  ", token);
      const response = await fetch(`http://localhost:8000/api/recipes/?search=${sanitizedSearchTerm}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      //testing response for errors
      const raw_response = await response.text();
      if(response.ok) {
        const data = JSON.parse(raw_response);
        // log results, then update the recipes state
        console.log("Search successful, results:  ", data)
        setRecipes(data);
      } else {
        // log the response when it fails
        console.log("error during search.  respons:  ", raw_response)
        console.error('Response was not "ok"', raw_response)
      }

    // catch and log any errors while searching
    } catch (error) {
      console.log("error:", error);
      console.error('Error fetching recipes:', error);
    }
  };

  // display recipe items after searching
  return (
    <div className="recipe-search-page">
      <h1 className="search-title">Recipe Search</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="results-section">
        <h2 className="results-title">Results:</h2>
        
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>
                <h3 className="recipe-name">{recipe.name}</h3>
              </Link>
              <p className="recipe-description">{recipe.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;