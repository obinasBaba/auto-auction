import React, { useEffect } from 'react';
import s from './landingpage.module.scss';
import { useRouter } from 'next/router';
import VehicleLocation from '@/scenes/Listings/VehicleLocation';
import UploadPhotos from '@/scenes/Listings/UploadPhotos';
import VehicleDescription from '@/scenes/Listings/VehicleDescription';
import AuctionRules from '@/scenes/Listings/AuctionRules';

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

      {/*<VehicleLocation />*/}

      {/*<UploadPhotos/>*/}

      {/*<VehicleDescription/>*/}

      <AuctionRules />
    </div>
  );
};

export default LandingPage;
