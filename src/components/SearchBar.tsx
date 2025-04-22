import React from 'react';
import { TextField } from '@mui/material';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <TextField
            fullWidth
            label="Search tracks..."
            variant="outlined"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            data-testid="search-input"
        />
    );
};

export default SearchBar;