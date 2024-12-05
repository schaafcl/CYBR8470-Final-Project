import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [recipe, setRecipes] = useState([]);

  useEffect(() => {
    // Make an API call to the Django backend
    axios.get('http://localhost:8000/api/recipes/7')
      .then(response => {
        setRecipes(response.data); // Store the response data in state
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="App">
      <h1>Recipes</h1>
      <ul>
        {recipe.map(recipe => (
          <li key={recipe.id}>
            {recipe.name} Description:  {recipe.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;