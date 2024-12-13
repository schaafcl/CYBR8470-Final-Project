import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RecipeViewPage = () => {
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
  const [error, setError] = useState(null);
  const [selectedProtein, setSelectedProtein] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
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
        setSelectedProtein(data.protein)
        setSelectedCategory(data.category)
      } catch (error) {
        setError(error.message);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event);
    console.log(event.target);
    console.log(name);
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProteinChange = (event) => {
    //console.log(event);
    setSelectedProtein(event.target.value);
    formData.protein = event.target.value;
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    formData.category = event.target.value;
  }

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
              <textarea rows="10" cols="100"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div>
            <label>
              Servings:
              <textarea rows="2" cols="4"
                name="servings"
                value={formData.servings}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Prep Time:
              <textarea rows="2" cols="4"
                name="prep_time"
                value={formData.prep_time}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Cook Time:
              <textarea rows="2" cols="4"
                name="cook_time"
                value={formData.cook_time}
                onChange={handleInputChange}
              />
            </label>
          </div>

          {/* Protein type */}
          <div>
            <label htmlFor="protein">Type of protein:</label>
            <select
              name="selectedProtein"
              value={selectedProtein}
              onChange={handleProteinChange}
            >
            <option value="">{formData.protein}</option>
            <option value="beef">beef</option>
            <option value="pork">pork</option>
            <option value="poultry">poultry</option>
            <option value="seafood">seafood</option>
            <option value="venison">venison</option>
            <option value="wild game">other wild game</option>
            <option value="vegetable">vegetable</option>
            <option value="none">none</option>
            </select>
          </div>

          {/* Meal category */}
          <div>
            <label htmlFor="category">Meal Category:</label>
            <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            >
            <option value="">{formData.category}</option>
            <option value="breakfast">breakfast</option>
            <option value="dinner">dinner</option>
            <option value="side dish">side dish</option>
            <option value="salad">salad</option>
            <option value="soup">soup</option>
            <option value="dessert">dessert</option>
            <option value="condiment">condiment</option>
            </select>
          </div>  

          <div>
            <label>
              Instructions:
              <textarea rows="10" cols="100"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Ingredients (separate each ingredient with a comma):
              <textarea rows="10" cols="100"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
              />
            </label>
          </div> 
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div>
          <h3>Description:</h3>
          <p>{recipe.description}</p>
          <h3>Servings:</h3>
          <p>{recipe.servings}</p>
          <h3>Prep Time (in minutes)</h3>
          <p>{recipe.prep_time}</p>
          <h3>Cook Time (in minutes)</h3>
          <p>{recipe.cook_time}</p>
          <h3>Protein</h3>
          <p>{recipe.protein}</p>
          <h3>Category</h3>
          <p>{recipe.category}</p>
          <h3>Ingredients:</h3>
          <ul>
            
          {recipe.ingredients.split(',').map(ingredient => {
                  return <li key={ingredient}>{ingredient}</li>
                })}
          </ul>
          <h3>Instructions:</h3>
          <p>{recipe.instructions}</p>
        </div>
      )}

      {/* Button to delete the recipe */}
      <button onClick={handleDelete}>Delete Recipe</button>

      </div>
)};

export default RecipeViewPage;