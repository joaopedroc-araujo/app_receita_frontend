import React from 'react';

function SearchBar() {
  return (
    <div>
      <h1>SearchBar</h1>
      <input
        htmlFor="search-input"
        type="text"
        data-testid="search-input"
        name="search-input"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBar;
