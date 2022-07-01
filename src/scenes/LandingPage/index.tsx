import React from 'react';
import s from './landingpage.module.scss';
import { useRouter } from 'next/router';
import { Avatar, Button, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import Car1 from '@/public/car1.jpg';
import Car2 from '@/public/car2.jpg';
import Image from 'next/image';

const LandingPage = () => {
  const { login } = useRouter().query;
  const { data: session, status } = useSession();

  return (
    <div className={s.container}>
      <Typography variant="h1"> Landing Content</Typography>

      <pre>{JSON.stringify(session, null, 2)}</pre>

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
