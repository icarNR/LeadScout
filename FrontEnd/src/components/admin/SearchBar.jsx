<<<<<<< HEAD
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Pass the searchTerm to the parent component or function for further processing
    onSearch(searchTerm.trim()); // Trimming whitespace
  };

  const inputStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '2px solid rgb(37, 150, 190)', // Adjust border color here
    marginRight: '10px',
    fontSize: '14px',
    width: '200px', // Adjust width as needed
  };

  const buttonStyle = {
    backgroundColor: 'rgb(37, 150, 190)', // Adjust background color here
    color: 'white',
    padding: '8px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Enter ID to search..."
        value={searchTerm}
        onChange={handleInputChange}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Search</button>
    </form>
  );
};

export default SearchBar;
=======
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Pass the searchTerm to the parent component or function for further processing
    onSearch(searchTerm.trim()); // Trimming whitespace
  };

  const inputStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '2px solid rgb(37, 150, 190)', // Adjust border color here
    marginRight: '10px',
    fontSize: '14px',
    width: '200px', // Adjust width as needed
  };

  const buttonStyle = {
    backgroundColor: 'rgb(37, 150, 190)', // Adjust background color here
    color: 'white',
    padding: '8px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Enter ID to search..."
        value={searchTerm}
        onChange={handleInputChange}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Search</button>
    </form>
  );
};

export default SearchBar;
>>>>>>> 0cd8f09c925e41c13ff6256645bfbba3d3ebd74d
