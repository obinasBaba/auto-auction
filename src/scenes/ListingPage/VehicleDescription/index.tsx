import React from 'react';
import s from './vehicledescribtion.module.scss';
import { TextField } from '@mui/material';
import { Field } from 'formik';

const VehicleDescription = (props: any) => {
  return (
    <div className={s.container}>
      <div className="wrapper">
        <h2> Describe Your Vehicle </h2>
        <div className="form">
          <Field
            name="auction.title"
            label="Listing Title"
            type="text"
            required
            variant="outlined"
            as={TextField}
          />
          <Field
            name="auction.description"
            label="Extended Description"
            multiline
            rows={8}
            type="text"
            required
            variant="outlined"
            as={TextField}
          />
          <Field
            // name="auction.price"
            label="Price in USD"
            type="number"
            variant="outlined"
            as={TextField}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleDescription;
