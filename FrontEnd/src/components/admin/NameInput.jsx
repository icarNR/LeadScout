import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

const StyledInput = styled('input')(({ theme }) => ({
  border: '2px solid', // Bold border
  borderColor: theme.palette.primary.main, // Use theme primary color
  borderRadius: 4,
  padding: theme.spacing(1),
  fontSize: '1rem',
  outline: 'none',
  '&:focus': {
    borderColor: theme.palette.primary.dark,
  }
}));

const NameInput = () => {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <StyledInput
        type="text"
        value={name}
        onChange={handleChange}
        placeholder=" "
      />
      {name && <p>Hello, {name}!</p>}
    </div>
  );
};

export default NameInput;
