import React from 'react';
import s from './landingpage.module.scss';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const LandingPage = () => {
  const { login } = useRouter().query;
  const { data: session, status } = useSession();

  const mo2 = useMotionValue(1);

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
