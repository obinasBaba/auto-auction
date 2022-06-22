import React, { useEffect } from 'react';
import s from './landingpage.module.scss';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';

const LandingPage = () => {
  const { login } = useRouter().query;

  return (
    <div className={s.container}>
      <Typography variant="h1"> Landing Content</Typography>

      {/*<WhatKindVehicle/>*/}

      {/*<BasicFeatures/>*/}

      {/*<VehicleLocation />*/}

      {/*<UploadPhotos/>*/}

      {/*<VehicleDescription/>*/}

      {/*<AuctionRules />*/}
    </div>
  );
};

export default LandingPage;
