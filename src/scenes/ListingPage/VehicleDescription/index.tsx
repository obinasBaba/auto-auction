import React from 'react';
import s from './vehicledescribtion.module.scss';
import { TextField } from '@mui/material';
import { Field } from 'formik';
import { StepHeader } from '@/scenes/ListingPage/components';

const VehicleDescription = (props: any) => {
  return (
    <div className={s.container}>
      <div className="wrapper">
        <StepHeader text=" Describe Your Vehicle " />

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
            name="item.retail_price"
            label="est Retail Price"
            type="number"
            variant="outlined"
            required
            as={TextField}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleDescription;
