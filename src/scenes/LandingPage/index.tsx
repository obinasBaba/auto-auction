import React from 'react';
import s from './landingpage.module.scss';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const LandingPage = () => {
  const { login } = useRouter().query;
  const { data: session, status } = useSession();

  const mo = useMotionValue(200);
  const mo2 = useMotionValue(1);
  const pathLength = useTransform(mo, [0, 360], [0, 1]);

  return (
    <div className={s.container}>
      <Typography variant="h1"> Landing Content</Typography>

      <pre>{JSON.stringify(session, null, 2)}</pre>

      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M46.5 24C46.5 36.4264 36.4264 46.5 24 46.5C11.5736 46.5 1.5 36.4264 1.5 24C1.5 11.5736 11.5736 1.5 24 1.5C36.4264 1.5 46.5 11.5736 46.5 24Z"
          stroke="lightgray"
          stroke-width="3"
          style={{ pathLength: 1 }}
        />
        <motion.path
          d="M46.5 24C46.5 36.4264 36.4264 46.5 24 46.5C11.5736 46.5 1.5 36.4264 1.5 24C1.5 11.5736 11.5736 1.5 24 1.5C36.4264 1.5 46.5 11.5736 46.5 24Z"
          stroke="black"
          stroke-width="3"
          style={{ pathLength }}
        />
      </motion.svg>

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
