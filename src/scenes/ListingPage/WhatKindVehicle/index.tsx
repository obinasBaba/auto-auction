import React from 'react';
import s from './whatkindvehicle.module.scss';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { StepHeader } from '@/scenes/ListingPage/components';
import { Field } from 'formik';

const WhatKindVehicle = (props: any) => {
  const types = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Minivan', 'Cabriolet'];

  return (
    <div className={s.container}>
      <div className="kind_wrapper">
        <StepHeader text="What kind of vehicle are you listing" />

        <div className="form">
          <Field
            name="vin"
            id="vin"
            label="Vin Code"
            type="number"
            required
            placeholder="123456789"
            variant="outlined"
            as={TextField}
          />

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Vehicle Type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {types.map((type, idx) => (
                <Field
                  type="radio"
                  name="type"
                  key={type}
                  value={type}
                  control={<Radio />}
                  label={type}
                  as={FormControlLabel}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default WhatKindVehicle;
