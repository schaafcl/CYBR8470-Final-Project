import React from 'react';
import { useParams } from 'react-router-dom';

function RecipeView() {
  // Getting the recipe ID from the URL
  const { id } = useParams();
  
  // A simple recipe data based on the ID, hard coded for first attempt testing
  const recipes = {
    1: {
      title: "Spaghetti Carbonara",
      ingredients: ["Spaghetti", "Eggs", "Bacon", "Cheese", "Garlic"],
      instructions: "Cook spaghetti. Fry bacon. Mix eggs with cheese. Combine all and serve."
    },
    2: {
      title: "Chicken Curry",
      ingredients: ["Chicken", "Curry Powder", "Rice", "Onions", "Garlic", "Tomatoes"],
      instructions: "Cook chicken. Prepare curry sauce. Combine with rice and serve."
    }
  };

  const recipe = recipes[id];

  return (
    <div className="RecipeView">
      <h1>{recipe ? recipe.title : "Recipe not found"}</h1>
      {recipe ? (
        <>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{recipe.instructions}</p>
        </>
      ) : (
        <p>Sorry, the recipe could not be found.</p>
      )}
    </div>
  );
}

export default RecipeView;