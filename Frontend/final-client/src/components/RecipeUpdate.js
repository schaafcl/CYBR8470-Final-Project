import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeUpdate = () => {
  const { id } = useParams();  // Get the recipe ID from the URL
  const navigate = useNavigate();
  
  // State for holding form data
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
  });
  
  // State for loading/error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch the existing recipe data when the component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/recipes/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        const data = await response.json();
        setRecipe({
          title: data.title,
          description: data.description,
          ingredients: data.ingredients.join(', '), // Assuming ingredients is an array
          instructions: data.instructions,
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Handle form input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/recipes/${id}/`, {
        method: 'PATCH',  // Use Put if you want to completely overwrite an asset, PATCH when you want to update some but not all values
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
          ingredients: recipe.ingredients.split(',').map((ingredient) => ingredient.trim()),  // Split and clean up ingredients
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }

      alert('Recipe updated successfully!');
      navigate(`/recipes/${id}`);  // Navigate back to the recipe details page after update
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Update Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
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
    </div>
  );
};

export default RecipeUpdate;
