import React, { useEffect } from 'react';
import s from './landingpage.module.scss';
import { useRouter } from 'next/router';
import { Button, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';

const LandingPage = () => {
  const { login } = useRouter().query;
  const { data: session, status } = useSession();

  return (
    <div className={s.container}>
      <Typography variant="h1"> Landing Content</Typography>

      <pre>{JSON.stringify(session, null, 2)}</pre>

      {session ? (
        <Button size="large" variant="contained" onClick={() => signOut()}>
          Sign Out
        </Button>
      ) : (
        <Button size="large" variant="contained" onClick={() => signIn()}>
          Sign In
        </Button>
      )}

      {/*<WhatKindVehicle/>*/}

      {/*<BasicFeatures/>*/}

      {/*<VehicleLocation />*/}

      {/*<VehiclePhoto/>*/}

      {/*<VehicleDescription/>*/}

      {/*<AuctionRules />*/}
    </div>
  );
};

export default LandingPage;
