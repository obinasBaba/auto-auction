import React, { useEffect } from 'react';
import s from './landingpage.module.scss';
import { useRouter } from 'next/router';
import VehicleLocation from '@/scenes/Listings/VehicleLocation';

const LandingPage = () => {
  const { login } = useRouter().query;

  useEffect(() => {
    console.log('loginModal Activate :', login);
  }, [login]);

  return (
    <div className={s.container}>
      {/*<Typography variant="h1"> Landing Content</Typography>*/}

      {/*<WhatKindVehicle/>*/}

      {/*<BasicFeatures/>*/}

      <VehicleLocation />
    </div>
  );
};

export default LandingPage;
