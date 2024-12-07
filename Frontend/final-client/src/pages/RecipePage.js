import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Fetch data from Django API using axios
      axios.get('http://localhost:8000/api/recipes/')
        .then(response => {
          setRecipes(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
          setLoading(false);
        });
    }, []); // Empty dependency array means it runs once when the component mounts
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>Recipes</h1>
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.id}>
              <h2>{recipe.name}</h2>
              <p>{recipe.instructions}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RecipePage;