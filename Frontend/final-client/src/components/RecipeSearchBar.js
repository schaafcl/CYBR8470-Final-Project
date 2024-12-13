import React, { useState } from 'react';
import DOMPurify from 'dompurify'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const raw_input = e.target.value;
    const sanitized_input = DOMPurify.sanitize(raw_input);
    setQuery(sanitized_input);
  };

  const handleSearch = () => {
    console.log("query=  ", query)
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