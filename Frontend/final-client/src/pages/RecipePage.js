import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RecipePage = () => {
  const { id } = useParams();  // Extract the recipe id from the URL
  // changin useState(null) to include recipe attributes
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    servings: '',
    prep_time: '',
    cook_time: '',
    protein: '',
    category: '',
    instructions: '',
    image: '',
    ingredients: ''
  });
  // navigate back after deletion
  const navigate = useNavigate();
  // added while testing update functionality
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // handles state toggling for viewing and editing the recipe
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/recipes/${id}/`);
        if(!response.ok) {
          throw new Error('Recipe was not found!');
        }
        const data = await response.json();
        // print for testing
        console.log(data)
        // setting recipe to response data attributes
        setRecipe({
          name: data.name,
          description: data.description,
          servings: data.servings,
          prep_time: data.prep_time,
          cook_time: data.cook_time,
          protein: data.protein,
          category: data.category,
          instructions: data.instructions,
          image: data.image,
          // handles ingredients being in an array structure
          ingredients: data.ingredients.join(', ')
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [id]);

  // Handles deleting of recipe.  Triggered via button on the recipe page, sends a delete request to the api to remove the recipe and includes a confirmation request
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8000/api/recipes/${id}/`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Recipe deleted successfully!');
          // redirect back to search results after deleting recipe
          navigate(-1);  
        } else {
          alert('Failed to delete the recipe');
        }
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('An error occurred while deleting the recipe');
      }
    }
  };

  // Handles when form input chages
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }))
  }

  // Handles form submission, when a recipe is updated
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/recipes/${id}/`, {
        method: 'PATCH',  // Use PATCH or PUT depending on your API setup
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: recipe.name,
          description: recipe.description,
          servings: recipe.servings,
          prep_time: recipe.prep_time,
          cook_time: recipe.cook_time,
          protein: recipe.protein,
          category: recipe.category,
          instructions: recipe.instructions,
          image: recipe.image,
          // handles ingredients being in an array structure
          ingredients: recipe.ingredients.split(',').map((ingredient) => ingredient.trim()),  // Split and clean up ingredients
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }

      alert('Recipe updated successfully!');
      setIsEditing(false);  // Switch back to view mode after successful update
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Recipe Details</h1>
      {/* displays information about recipe and maps ingredients ot list items */}
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>
              {ingredient.name}  -  {ingredient.description}        {ingredient.quantity}  -  {ingredient.measurement_unit}
          </li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
      {/* Toggle between viewing and editing the recipe */}
      <button onClick={toggleEdit}>{isEditing ? 'Cancel Edit' : 'Edit Recipe'}</button>
      {/* button to remove recipe */}
      <button onClick={handleDelete}>Delete Recipe</button>

      {isEditing ? (
        // Recipe update form
        <form onSubmit={handleSubmit}>
          <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Servings:</label>
          <textarea
            name="servings"
            value={recipe.servings}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Prep Time:</label>
          <textarea
            name="prep_time"
            value={recipe.prep_time}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Cook Time:</label>
          <textarea
            name="cook_time"
            value={recipe.cook_time}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Protein:</label>
          <textarea
            name="protein"
            value={recipe.protein}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <textarea
            name="category"
            value={recipe.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </div>

        { /* placeholder for updating images, need to fix this */}
        <div>
          <label>Image:</label>
          <textarea
            name="image"
            value={recipe.image}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Ingredients (comma-separated):</label>
          <input
            type="text"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Recipe</button>
        </form>
      ) : (
        // Recipe details view
        <div>
          <h2>{recipe.name}</h2>
          <p><strong>Description:</strong> {recipe.description}</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Prep Time:</strong> {recipe.prep_time}</p>
          <p><strong>Cook Time:</strong> {recipe.cook_time}</p>
          <p><strong>Protein:</strong> {recipe.protein}</p>
          <p><strong>Category:</strong> {recipe.category}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
          <p><strong>Image:</strong> {recipe.image}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
        </div>
      )}
    </div>
  );
};
      
export default RecipePage;