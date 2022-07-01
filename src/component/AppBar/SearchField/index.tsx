import React from 'react';
import s from './searchfield.module.scss';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = () => {
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 5000,
    overflow: 'hidden',
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    backgroundColor: 'rgba(121, 99, 240, 0.08)',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
          backgroundColor: 'rgba(121, 99, 240, 0.08)',
        },
      },
    },
  }));

  return (
    <div className={s.container}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </div>
  );
};

export default SearchField;
