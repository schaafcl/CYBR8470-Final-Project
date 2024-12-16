import React, { useState } from "react";
import AddNewRecipeForm from "../components/AddNewRecipeForm";
import '../styles.css'; // Import your form component

// Page for adding new recipes not already in the database
const AddNewRecipePage = () => {
  // State to hold the recipe data
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    servings: "",
    prep_time: "",
    cook_time: "",
    protein: "",
    category: "",
    instructions: "",
    ingredients: "",
  });

  // States for various statuses/events on the page, is submitting ended up not being used but it could be used to check whether the app hangs on adding a new recipe
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  // Function to handle form submission, the form used is AddNewRecipeForm
  const handleSubmit = async (data) => {
    // update recipe fields, reset error and response messages and set the state for submitting to be active
    setRecipeData(data);
    setIsSubmitting(true);
    setError(null);
    setResponseMessage(null);

    try {
        // attempt sending the POST request to the api, body is JSON version of the data argument
        const token = localStorage.getItem('access_token')
        const response = await fetch('http://localhost:8000/api/recipes/', {
          method: 'POST', 
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify(data),
        });
        // send an error if the request receives an error response
        if (!response.ok) {
          throw new Error("Failed to save recipe. Please try again.");
        }
        // get json formatted info from the http response, set the response message to successful and log it, update the recipe data fields
        const result = await response.json();
        setResponseMessage("Recipe successfully saved!");
        console.log(responseMessage);
        setRecipeData(result); 
  
        // catch any errors and log them
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        // reset submitting state as submission at this point should be done
        setIsSubmitting(false); 
      }
  };

  return (
    <div className="add-recipe-page">
      <h1 className="page-title">Add a New Recipe</h1>
      {/* Pass handleSubmit to form */}
      <AddNewRecipeForm onSubmit={handleSubmit} /> 
      <div className="recipe-preview">
        <h3 className="preview-title">Recipe Preview:</h3>
        <p><strong>Recipe Name:</strong> {recipeData.name}</p>
        <p><strong>Ingredients:</strong> </p>
        <ul className="ingredients-list">{
          recipeData.ingredients.split(',').map((ingredient, index) => {return <li key={index}>{ingredient}</li>})
        }
        </ul>
        <p className="instructions"><strong>Instructions:</strong> {recipeData.instructions} </p>
      </div>
    </div>
  );
};

export default AddNewRecipePage;