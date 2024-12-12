import React, { useState } from 'react';
import AddNewIngredientForm from './AddNewIngredientForm'

const RecipeForm = ({ onSubmit }) => {
  // Define state variables for each input field
  const [name, setRecipeName] = useState('');
  const [description, setRecipeDescription] = useState('');
  const [servings, setRecipeServings] = useState('');
  const [prep_time, setRecipePrepTime] = useState('');
  const [cook_time, setRecipeCookTime] = useState('');
  const [protein, setRecipeProtein] = useState('');
  const [category, setRecipeCategory] = useState('');
  const [instructions, setRecipeInstructions] = useState('');
  //const [image, setImage] = useState('');
  //const [imageURL, setImageURL] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [ingredient_name, setIngredientName] = useState('');
  const [ingredient_description, setIngredientDescription] = useState('');
  const [ingredient_quantity, setIngredientQuantity] = useState('');
  const [ingredient_measurement_unit, setIngredientUnits] = useState('');

  const [addingIngredients, setAddingIngredients] = useState(false);

  const handleIngredientSubmit = (e) => {
    e.preventDefault();
    console.log("e:  ", e);
    const { name, value } = e.target;
    setIngredients({ ...ingredients, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the recipe data
    const newRecipe = {
      name: name,
      description: description,
      servings: servings,
      prep_time: prep_time,
      cook_time: cook_time,
      protein: protein,
      category: category,
      instructions: instructions,
      //image: image,
      //imageURL: imageURL,
      ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
    };

    

    // Call the onSubmit prop passed to the component (this will handle saving the recipe)
    onSubmit(newRecipe);

    // NOTE:  Reset form fields, commented out to leave fields with previous entries for testing
    //setRecipeName('');
    //setRecipeDescription('');
    //setRecipeServings('');
    //setRecipePrepTime('');
    //setRecipeCookTime('');
    //setRecipeProtein('');
    //setRecipeCategory('');
    //setRecipeInstructions('');
    //setImage('');
    //setImageURL('');
    //setIngredients('');

  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>Add a New Recipe</h2>

      {/* Recipe name */}
      <div>
        <label htmlFor="name">Recipe Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setRecipeName(e.target.value)}
          required
        />
      </div>

      {/* Recipe descriptions */}
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setRecipeDescription(e.target.value)}
          required
        />
      </div>

      {/* Number of servings */}
      <div>
        <label htmlFor="servings">Number of servings:</label>
        <input
          type="text"
          id="servings"
          value={servings}
          onChange={(e) => setRecipeServings(e.target.value)}
          required
        />
      </div>

      {/* Preptime */}
      <div>
        <label htmlFor="prep_time">Prep Time (in minutes):</label>
        <input
          type="text"
          id="prep_time"
          value={prep_time}
          onChange={(e) => setRecipePrepTime(e.target.value)}
          required
        />
      </div>

      {/* Cooktime */}
      <div>
        <label htmlFor="cook_time">Cook Time (in minutes):</label>
        <input
          type="text"
          id="cook_time"
          value={cook_time}
          onChange={(e) => setRecipeCookTime(e.target.value)}
          required
        />
      </div>

      {/* Protein type */}
      <div>
        <label htmlFor="protein">Type of protein:</label>
        <select
          id="protein"
          value={protein}
          onChange={(e) => setRecipeProtein(e.target.value)}
        >
          <option value="">Select Protein Type</option>
          <option value="beef">Beef</option>
          <option value="pork">Pork</option>
          <option value="poultry">Poultry</option>
          <option value="seafood">Seafood</option>
          <option value="venison">Venison</option>
          <option value="wild_game">Other Wild Game</option>
          <option value="vegetable">Vegetable</option>
          <option value="none">None</option>

        </select>
      </div>

      {/* Meal category */}
      <div>
        <label htmlFor="category">Meal Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setRecipeCategory(e.target.value)}
        >
          <option value="">Select Meal Category</option>
          <option value="breakfast">Breakfast</option>
          <option value="dinner">Dinner</option>
          <option value="side_dish">Side Dish</option>
          <option value="salad">Salad</option>
          <option value="soup">Soup</option>
          <option value="dessert">Dessert</option>
          <option value="condiment">Condiment</option>

        </select>
      </div>  

      {/* Instructions */}
      <div>
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setRecipeInstructions(e.target.value)}
          required
        />
      </div>

      {/* Ingredients */}
      <div>
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <button onClick={() => setAddingIngredients(!addingIngredients)}>
        {addingIngredients ? 'Cancel Adding Ingredients' : 'Add Ingredient'}
        </button>

        {addingIngredients && (
            <div className="add-ingredient-page">
                
                
                
                <h1>Add Ingredient</h1>
                <AddNewIngredientForm onSubmit={handleIngredientSubmit()} />
            </div>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
