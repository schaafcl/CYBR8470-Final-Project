import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

// page for viewing a specific recipe.  Clicking on a recipe on the homepage after searching brings you here
const RecipeViewPage = () => {

  // get the recipe id from the URL, setupt the recipe state variable
  const { id } = useParams(); 
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
  const navigate = useNavigate(-1);
  // state variables when editing a recipe
  // is editing handles the toggling state for viewing or editing a recipe
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  // state variables for the curated option lists for protein and category
  const [selectedProtein, setSelectedProtein] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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

  // triggers when navigating to this page
  useEffect(() => {
    // retrieve the recipe from the database, log any errors if fetch fails
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/recipes/${id}/`);
        if(!response.ok) {
          console.log("recipe view page failed to fetch recipe, response:  ", response);
          throw new Error('Recipe was not found!');
        }
        // get the json data from the response and populate the recipe object's fields
        const data = await response.json();
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
        console.log("error updating recipe data from view page", error, error.message);
      }
    };
    fetchRecipe();
  }, [id]);

  // Handles deleting of recipe.  Triggered via button on the recipe page, sends a delete request to the api to remove the recipe and includes a confirmation request
  const handleDelete = async () => {
    // confirmation before deleting a database item
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
          // failed to delete but no error was generated
          alert('Failed to delete the recipe');
        }
      } catch (error) {
        console.error('Error deleting recipe:', error);
        console.log("recipe view failed to delete a recipe object.  Error:  ", error);
        alert('An error occurred while deleting the recipe');
      }
    }
  };  

  // handles when input fields are changed while editing a recipe.  Sanitize the value input from users before setting the recipe data
  const handleInputChange = (event) => {
    
    const { name, value } = event.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  // handle the dropdown toggle for protein, options are curated so input sanitization and escaping isn't required
  const handleProteinChange = (event) => {
    //console.log(event);
    setSelectedProtein(event.target.value);
    formData.protein = event.target.value;
  }
  // same as protein, input sanitization and escaping isn't required where there's no input left entirely to the user
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    formData.category = event.target.value;
  }

  // handles submitting the changes to a recipe
  const handleUpdate = async (event) => {
    event.preventDefault();
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
      console.log(error);
      alert('An error occurred while updating the recipe');
    }
  };

  // displays a loading prompt while retrieving a recipe
  if (!recipe) {
    return <div>Loading...</div>;
  }
  // display any errors
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
      {/* editing mode */}
      {isEditing ? (
        <form onSubmit={handleUpdate}>

          {/* recipe name */}
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

          {/* description */}
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

          {/* servings */}
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

          {/* recipe prep time */}
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

          {/* recipe cook time */}
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

          {/* recipe instructions */}
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

          {/* ingredients */}
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

          {/* button submits the form finishing the recipe updates */}
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div>
          {/* Display whe not in edit mode */}
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