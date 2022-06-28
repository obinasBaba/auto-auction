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
      <div className="blue_bg">
        <div className="overlay"></div>
        <div className="car">
          <Image src={Car1} objectFit="cover" />
        </div>

        <div className="content">
          <Avatar className="avatar" sx={{ width: 70, height: 70 }} />
          <div className="name">
            <h1>Henok Getachew</h1>
            <Typography variant="body2">henokgetachew500@gmail.com</Typography>
          </div>
        </div>
      </div>

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
