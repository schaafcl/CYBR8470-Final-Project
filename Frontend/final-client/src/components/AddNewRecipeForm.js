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
      <div className="form-group">
        <label htmlFor="name">Recipe Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Enter recipe name"
        />
      </div>

      {/* Recipe descriptions */}
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows="6"
          placeholder="Enter recipe description"
        />
      </div>

      {/* Number of servings */}
      <div className="form-group">
        <label htmlFor="servings">Number of servings:</label>
        <input
          type="number"
          id="servings"
          name="servings"
          value={formData.servings}
          onChange={handleInputChange}
          required
          placeholder="Enter number of servings"
        />
      </div>

      {/* Preptime */}
      <div className="form-group">
        <label htmlFor="prep_time">Prep Time (in minutes):</label>
        <input
          type="number"
          id="prep_time"
          name="prep_time"
          value={formData.prep_time}
          onChange={handleInputChange}
          required
          placeholder="Enter recipe prep time in minutes"
        />
      </div>

      {/* Cooktime */}
      <div className="form-group">
        <label htmlFor="cook_time">Cook Time (in minutes):</label>
        <input
          type="number"
          id="cook_time"
          name="cook_time"
          value={formData.cook_time}
          onChange={handleInputChange}
          required
          placeholder="Enter cook time in minutes"
        />
      </div>

      {/* Protein type */}
      <div className="form-group">
        <label htmlFor="protein">Type of protein:</label>
        <select
          id="protein"
          name="protein"
          value={formData.protein}
          onChange={handleInputChange}
          required
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
      <div className="form-group">
        <label htmlFor="category">Meal Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
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
      <div className="form-group">
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleInputChange}
          required
          rows="6"
          placeholder="Enter step by step instructions"
        />
      </div>

      {/* Ingredients */}
      <div className="form-group">
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleInputChange}
          required
          rows="6"
          placeholder="List ingredients, separating each by a comma"
        />
      </div>
      <div className="form-group">
      {/* Submit Button */}
      <button type="submit" className="btn-submit">Add Recipe</button>
      </div>
    </form>
  );
};

export default RecipeForm;
