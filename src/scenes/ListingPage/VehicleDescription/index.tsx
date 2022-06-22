import React from 'react';
import s from './vehicledescribtion.module.scss';
import { TextField } from '@mui/material';
import { ControlButtons } from '@/scenes/ListingPage/components';

const VehicleDescription = (props: any) => {
  return (
    <div className={s.container}>
      <div className="wrapper">
        <h2> Describe Your Vehicle </h2>
        <div className="form">
          <TextField
            id="title"
            label="Listing Title"
            type="text"
            required
            variant="outlined"
          />
          <TextField
            id="extended_desc"
            label="Extended Description"
            multiline
            rows={8}
            type="text"
            required
            variant="outlined"
          />
          <TextField
            id="price"
            label="Price in USD"
            type="number"
            required
            variant="outlined"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleDescription;
