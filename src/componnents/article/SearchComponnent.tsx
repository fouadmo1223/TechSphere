import React, { useState, useEffect } from 'react';
import { InputBase, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { useDebounce } from '@/helpers/Debounce';
import { motion } from 'framer-motion';

const SearchContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '2px 4px',
    borderRadius: '4px',
    boxShadow: theme.shadows[1],
    width: '100%',
    maxWidth: '500px',
    marginBottom: theme.spacing(4),
    marginRight: 'auto',
    transition: 'box-shadow 0.3s',
    '&:focus-within': {
        boxShadow: theme.shadows[4],
    },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
    marginLeft: theme.spacing(1),
    flex: 1,
}));

interface SearchComponentProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ value, onChange }) => {
    const debouncedTerm = useDebounce(value, 500);

    // Effect for the debounced term
    useEffect(() => {
        if (debouncedTerm) {
            console.log('Search term:', debouncedTerm);
            // Here you would typically make an API call or perform search
        }
    }, [debouncedTerm]);

    return (
        <motion.div 
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ 
                duration: 1,
                type: 'spring',
                damping: 6
            }}
        >
            <SearchContainer>
                <SearchInput
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={value}
                    onChange={onChange}
                />
                <IconButton disabled type="button" aria-label="search" sx={{ p: '10px' }}>
                    <SearchIcon />
                </IconButton>
            </SearchContainer>
        </motion.div>
    );
};

export default SearchComponent;