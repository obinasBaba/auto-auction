import React from 'react';
import s from './search.module.scss';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { SearchTwoTone } from '@mui/icons-material';

const SearchPage = () => {
  return (
    <div className={s.container}>
      <div className="wrapper">
        <div className="title">
          <h1>Find Vehicle</h1>
          <TextField
            fullWidth
            name="amount"
            type="text"
            variant="standard"
            color="primary"
            label="keyword"
            placeholder="type your key word"
            focused={false}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    color="primary"
                    sx={{ backgroundColor: 'rgba(121, 99, 240, 0.08)' }}
                  >
                    <SearchTwoTone />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
