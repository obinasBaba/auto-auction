import React from 'react';
import s from './landingpage.module.scss';
import { Typography } from '@mui/material';

const LandingPage = () => {
  return (
    <div className={s.container}>
      <Typography variant="h1"> Main Content</Typography>
    </div>
  );
};

export default LandingPage;
