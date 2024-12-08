import React, { useState } from 'react';
import SearchBar from '../components/RecipeSearchBar';
import { Link } from 'react-router-dom'


const HomePage = () => {

  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`http://localhost:8000/api/recipes/?search=${searchTerm}`);
      console.log(searchTerm)
      //testing response for errors
      const raw_response = await response.text();
      console.log(raw_response)
      if(response.ok) {
        const data = JSON.parse(raw_response);
        setRecipes(data);
      } else {
        console.error('Response was not "ok"', raw_response)
      }

      const data = await response.json();
      setRecipes(data); // Store recipes in the state
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };


  return (
    <div>
      <h1>Recipe Search</h1>
      <SearchBar onSearch={handleSearch} />

      <div>
        <h2>Results:</h2>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/api/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
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