import React, { useState } from 'react';
import DOMPurify from 'dompurify'
import '../styles.css';

// search bar component, appears on the home page, used to search/filter recipes
const SearchBar = ({ onSearch }) => {
  // query variable, the search criteria
  const [query, setQuery] = useState('');

  // called when values inside the search bar are chaged by users.  Takes the raw input value, uses dompurify to sanitize/escape it, then set the state of the query variable
  const handleChange = (e) => {
    const raw_input = e.target.value;
    const sanitized_input = DOMPurify.sanitize(raw_input);
    setQuery(sanitized_input);
  };

  // handles the search event
  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for recipes"
        value={query}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;