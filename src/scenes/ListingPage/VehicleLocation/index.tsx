import React, { useState } from 'react';
import s from './vehiclelocation.module.scss';
import { TextField } from '@mui/material';
import { Field } from 'formik';
import { StepHeader } from '@/scenes/ListingPage/components';

const VehicleLocation = (props: any) => {
  const countries = ['one', 'two', 'three'];

  const [country, setCountry] = useState(countries[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  return (
    <div className={s.container}>
      <div className="location_wrapper">
        <StepHeader text="Where's your vehicle <br /> located?" />

        <div className="form">
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
            as={TextField}
          />

          <div className="hor">
            <Field
              name="address.city"
              label="City"
              type="text"
              required
              variant="outlined"
              as={TextField}
            />
            <Field
              name="address.zipcode"
              label="ZipCode"
              type="number"
              required
              variant="outlined"
              as={TextField}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleLocation;
