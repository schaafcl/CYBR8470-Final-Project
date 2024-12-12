import React, { useState } from "react";
import AddNewRecipeForm from "../components/AddNewRecipeForm"; // Import your form component

// This is your main page for adding a new recipe
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  

  // Function to handle form submission
  const handleSubmit = async (data) => {
    // logging print
    console.log("Recipe submitted:", data);
    //setRecipeData(data);
    setIsSubmitting(true);
    setError(null);
    setResponseMessage(null);
    try {
        // Replace this URL with your actual API endpoint
        const apiUrl = "https://localhost:8000/api/recipes";
  
        const response = await fetch(apiUrl, {
          method: "PUT", // Use PUT to update or create the resource
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Send the recipe data as JSON
        });
  
        if (!response.ok) {
          throw new Error("Failed to save recipe. Please try again.");
        }
  
        const result = await response.json();
        setResponseMessage("Recipe successfully saved!");
        console.log(responseMessage);
        setRecipeData(result); // Update state with the saved recipe data
  
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        setIsSubmitting(false); // Reset the submitting state
      }
  };

  return (
    <div className="add-recipe-page">
      <h1>Add a New Recipe</h1>
      <AddNewRecipeForm onSubmit={handleSubmit} /> {/* Pass handleSubmit to form */}
      <div className="recipe-preview">
        <h3>Recipe Preview:</h3>
        <p><strong>Recipe Name:</strong> {recipeData.name}</p>
        <p><strong>Ingredients:</strong> {recipeData.ingredients}</p>
        <p><strong>Instructions:</strong> {recipeData.instructions}</p>
      </div>
    </div>
  );
};

export default AddNewRecipePage;