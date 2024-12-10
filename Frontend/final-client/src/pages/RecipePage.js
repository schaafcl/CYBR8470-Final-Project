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
  const [isEditing, setIsEditing] = useState(false);  // State to toggle between view and edit modes
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    servings: '',
    prep_time: '',
    cook_time: '',
    protein: '',
    category: '',
    instructions: '',
    ingredients: []
  });


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/recipes/${id}/`);
        if(!response.ok) {
          throw new Error('Recipe was not found!');
        }
        const data = await response.json();
        // print for testing
        console.log(data);
        setRecipe(data);
        setFormData({
          name: data.name,
          description: data.description,
          servings: data.servings,
          prep_time: data.prep_time,
          cook_time: data.cook_time,
          protein: data.protein,
          category: data.category,
          instructions: data.instructions,
          ingredients: data.ingredients
        })
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // testing for handling changes
  const handleIngredientChange = (e, index) => {
    const { name, value } = e.target;
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [name]: value,
    };
    setFormData((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };

  // handler for submitting the update form
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/recipes/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Recipe updated successfully!');
        setIsEditing(false);  // Switch back to view mode after updating
        const updatedRecipe = await response.json();
        console.log('recipe udpated:', updatedRecipe);
        setRecipe(updatedRecipe);  // Update the displayed recipe with the latest data
      } else {
        alert('Failed to update the recipe');
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('An error occurred while updating the recipe');
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Display recipe in edit mode or view mode */}
      <h2>{isEditing ? 'Edit Recipe' : recipe.name}</h2>
      
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel Edit' : 'Edit Recipe'}
      </button>

      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div>
            <label>
              Servings:
              <textarea
                name="servings"
                value={formData.servings}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Prep Time:
              <textarea
                name="prep_time"
                value={formData.prep_time}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Cook Time:
              <textarea
                name="cook_time"
                value={formData.cook_time}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Protein:
              <textarea
                name="protein"
                value={formData.protein}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Category:
              <textarea
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <h3>Ingredients:</h3>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index}>
              <label>
                Ingredient Name:
                <input
                  type="text"
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
              </label>
              <label>
                Quantity:
                <input
                  type="text"
                  name="quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
              </label>
              <label>
                Unit:
                <input
                  type="text"
                  name="measurement_unit"
                  value={ingredient.measurement_unit}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
              </label>
            </div>
          ))}
          <div>
            <label>
              Instructions:
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div>
          <p>{recipe.description}</p>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name} - {ingredient.description} {ingredient.quantity} -{' '}
                {ingredient.measurement_unit}
              </li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{recipe.instructions}</p>
        </div>
      )}

      {/* Button to delete the recipe */}
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