import React, { useState } from 'react';

const RecipeForm = ({ onSubmit }) => {
  // Define state variables for each input field
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [servings, setServings] = useState('');
  const [prep_time, setPrepTime] = useState('');
  const [cook_time, setCookTime] = useState('');
  const [protein, setProtein] = useState('');
  const [category, setCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  //const [image, setImage] = useState('');
  //const [imageURL, setImageURL] = useState('');
  const [ingredients, setIngredients] = useState('');

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

    // Reset form fields
    setName('');
    setDescription('');
    setServings('');
    setPrepTime('');
    setCookTime('');
    setProtein('');
    setCategory('');
    setInstructions('');
    //setImage('');
    //setImageURL('');
    setIngredients('');

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
          onChange={(e) => setName(e.target.value)}
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
          onChange={(e) => setDescription(e.target.value)}
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
          onChange={(e) => setServings(e.target.value)}
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
          onChange={(e) => setPrepTime(e.target.value)}
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
          onChange={(e) => setCookTime(e.target.value)}
          required
        />
      </div>

      {/* Protein type */}
      <div>
        <label htmlFor="protein">Type of protein:</label>
        <select
          id="protein"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
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
          onChange={(e) => setCategory(e.target.value)}
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
          onChange={(e) => setInstructions(e.target.value)}
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
      </div>

      {/* Image URL (optional) 
      <div>
        <label htmlFor="imageURL">Image URL:</label>
        <input
          type="url"
          id="imageURL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </div>
      */}

      {/* Submit Button */}
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
