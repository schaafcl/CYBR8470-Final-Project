import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();  // Extract the recipe id from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/recipes/${id}/`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <h3>Ingredients:</h3>
      <p>{recipe.ingredients}</p>
    </div>
  );
};

export default RecipeDetails;