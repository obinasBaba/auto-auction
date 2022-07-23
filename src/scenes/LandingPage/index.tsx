import React from 'react';
import s from './landingpage.module.scss';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { useAppContext } from '@/context';

const LandingPage = () => {
  const { login } = useRouter().query;
  const { currentUser } = useAppContext();

  return (
    <div className={s.container}>
      <Typography variant="h1"> Landing Content</Typography>

      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    </div>
  );
};

export default LandingPage;
