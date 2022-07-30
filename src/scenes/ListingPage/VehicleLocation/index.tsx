import React from 'react';
import s from './vehiclelocation.module.scss';
import { MenuItem, TextField } from '@mui/material';
import { Field } from 'formik';
import { StepHeader } from '@/scenes/ListingPage/components';
import { ListingFormStepComponent } from '@/scenes/ListingPage';

const countries = ['Addis Abeba', 'Hawassa', 'Adama'];

const VehicleLocation: ListingFormStepComponent = ({ formikProps }) => {
  return (
    <div className={s.container}>
      <div className="location_wrapper">
        <StepHeader text="Where's your vehicle <br /> located?" />

        <div className="form">
          <Field
            name="address.city"
            label="City"
            type="text"
            variant="outlined"
            required
            select
            as={TextField}
            sx={{ flexGrow: 1.5 }}
          >
            {countries.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Field>

          <div className="hor">
            <Field
              name="address.streetAddress"
              variant="outlined"
              label="Street Address"
              as={TextField}
            />

            <Field
              name="address.apartmentNumber"
              variant="outlined"
              type="number"
              label="Suite, apartment number"
              error={Boolean(formikProps.errors.address?.apartmentNumber)}
              helperText={formikProps.errors.address?.apartmentNumber}
              as={TextField}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleLocation;
