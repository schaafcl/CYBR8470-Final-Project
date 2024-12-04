import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [ingredient, setIngredients] = useState([]);

  useEffect(() => {
    // Make an API call to the Django backend
    axios.get('http://localhost:8000/ingredients/')
      .then(response => {
        setIngredients(response.data); // Store the response data in state
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="App">
      <h1>Books</h1>
      <ul>
        {ingredient.map(book => (
          <li key={book.id}>
            {ingredient.name} Description:  {ingredient.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;