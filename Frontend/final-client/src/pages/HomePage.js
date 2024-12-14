import React, { useState } from 'react';
import SearchBar from '../components/RecipeSearchBar';
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'


// Main homepage.  Holds navigation links for the other pages, the search bar component for searching/filtering results, and the search results after searching
const HomePage = () => {

  // state to track the recipes for the search/filter results
  const [recipes, setRecipes] = useState([]);

  // handles the search event, when the search button is clicked
  const handleSearch = async (searchTerm) => {
    try {
      // sanitize the search bar input before attepting to search for it
      const sanitizedSearchTerm = DOMPurify.sanitize(searchTerm)
      const response = await fetch(`http://localhost:8000/api/recipes/?search=${sanitizedSearchTerm}`);
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
    <div>
      <h1>Recipe Search</h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        <h2>Results:</h2>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>
                <h3>{recipe.name}</h3>
              </Link>
              <p>{recipe.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;