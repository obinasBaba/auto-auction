import React from 'react';
import s from './listingcreated.module.scss';
import { Button } from '@mui/material';

const ListingCreated = () => {
  return (
    <div className={s.container}>
      <div className="wrapper">
        <h2>Listing Created</h2>
        <p>
          your new listing successfully created <br /> please setup avalablity
          and pricing
        </p>
        <Button variant="contained" size="large" fullWidth>
          proceed to auction setup
        </Button>
      </div>
    </div>
  );
};

export default ListingCreated;
