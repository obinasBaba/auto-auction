import React from 'react';
import s from './landingpage.module.scss';
import { TextField } from '@mui/material';

const LandingPage = () => {
  return (
    <div className={s.container}>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />

      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing.</h1>
    </div>
  );
};

export default LandingPage;
