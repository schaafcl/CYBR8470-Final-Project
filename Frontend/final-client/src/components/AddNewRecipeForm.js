import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import '../styles.css';

// Form used to add new recipes to the database, will be accessed on the AddRecipePage
const RecipeForm = ({ onSubmit }) => {
  
  // Setup form attributes and states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    servings: '',
    prep_time: '',
    cook_time: '',
    protein: '',
    category: '',
    instructions: '',
    ingredients: ''
  })

  // Handle form submission, when the button is clicked to submit the form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the recipe data
    const newRecipe = {

      name: formData.name,
      description: formData.description,
      servings: formData.servings,
      prep_time: formData.prep_time,
      cook_time: formData.cook_time,
      protein: formData.protein,
      category: formData.category,
      instructions: formData.instructions,
      ingredients: formData.ingredients,
    };
    // Call the onSubmit prop passed to the component (this will handle saving the recipe)
    onSubmit(newRecipe);
  };

  // Handle values in input fields being modified.  Accept raw input, then use DOMPurify library to sanitize and escape the input before updating the state for the formData
  const handleInputChange = (event) => {

    // retrieve the "name" and "value" fields from the html element, "name" is which variable will be updated in formData, set the value to the value received from the event input
    const { name, value } = event.target;
    // sanitize the raw input value before updating the form data
    const sanitizedValue = DOMPurify.sanitize(value);

    setFormData({
      ...formData,
      [name]: sanitizedValue
    });
  };

  // each element calls handleInputChange to update values as they are changed
  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>Add a New Recipe</h2>

      {/* Recipe name */}
      <div>
        <label htmlFor="name">Recipe Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Recipe descriptions */}
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Number of servings */}
      <div>
        <label htmlFor="servings">Number of servings:</label>
        <input
          type="text"
          id="servings"
          name="servings"
          value={formData.servings}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Preptime */}
      <div>
        <label htmlFor="prep_time">Prep Time (in minutes):</label>
        <input
          type="text"
          id="prep_time"
          name="prep_time"
          value={formData.prep_time}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Cooktime */}
      <div>
        <label htmlFor="cook_time">Cook Time (in minutes):</label>
        <input
          type="text"
          id="cook_time"
          name="cook_time"
          value={formData.cook_time}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Protein type */}
      <div>
        <label htmlFor="protein">Type of protein:</label>
        <select
          id="protein"
          name="protein"
          value={formData.protein}
          onChange={handleInputChange}
        >
          <option value="">Select Protein Type</option>
          <option value="beef">beef</option>
          <option value="pork">Pork</option>
          <option value="poultry">poultry</option>
          <option value="seafood">seafood</option>
          <option value="venison">venison</option>
          <option value="wild game">other wild game</option>
          <option value="vegetable">vegetable</option>
          <option value="none">none</option>
          <option value="other">other</option>
        </select>
      </div>

      {/* Meal category */}
      <div>
        <label htmlFor="category">Meal Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="">Select Meal Category</option>
          <option value="breakfast">breakfast</option>
          <option value="dinner">dinner</option>
          <option value="side dish">side dish</option>
          <option value="salad">salad</option>
          <option value="soup">soup</option>
          <option value="dessert">dessert</option>
          <option value="condiment">condiment</option>
          <option value="other">other</option>
        </select>
      </div>  

      {/* Instructions */}
      <div>
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Ingredients */}
      <div>
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Submit Button */}
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
