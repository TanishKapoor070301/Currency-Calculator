import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function InputBox({ from, setFrom, options, what }) {
  const handleChange = (e) => {
    setFrom(e.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{what}</InputLabel>
      <Select
        value={from}
        onChange={handleChange}
        label={what}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default InputBox;
