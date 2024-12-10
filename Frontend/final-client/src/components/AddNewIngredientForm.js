import React, { useState } from 'react';

const IngredientForm = ({ recipeKey, onSubmit }) => {
  // Define state variables for each input field
  const [name, setIngredientName] = useState('');
  const [description, setIngredientDescription] = useState('');
  const [quantity, setIngredientQuantity] = useState('');
  const [measurement_unit, setIngredieantUnits] = useState('');
  const [recipe, setParentRecipe] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the recipe data
    const newIngredient = {
      name: name,
      description: description,
      quantity: quantity,
      measurement_unit: measurement_unit,
      recipe: recipeKey
    };

    // Call the onSubmit prop passed to the component (this will handle saving the recipe)
    onSubmit(newIngredient);

    // Reset form fields comment out to leave the fields with the data left in them
    setIngredientName('');
    setIngredientDescription('');
    setIngredientQuantity('');
    setIngredieantUnits('');
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>Add a New Ingredient</h2>

      {/* Ingredient name */}
      <div>
        <label htmlFor="name">Ingredient Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setIngredientName(e.target.value)}
          required
        />
      </div>

      {/* Ingredient descriptions */}
      <div>
        <label htmlFor="description">Ingredient Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setIngredientDescription(e.target.value)}
          required
        />
      </div>

      {/* Number of servings */}
      <div>
        <label htmlFor="quantity">Ingredient Quantity:</label>
        <input
          type="text"
          id="quantity"
          value={quantity}
          onChange={(e) => setIngredientQuantity(e.target.value)}
          required
        />
      </div>

      {/* Preptime */}
      <div>
        <label htmlFor="measurement_unit">Measurement Units for Ingredient:</label>
        <input
          type="text"
          id="measurement_unit"
          value={measurement_unit}
          onChange={(e) => setIngredieantUnits(e.target.value)}
          required
        />
      </div>


      {/* Submit Button */}
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default IngredientForm;