import React, { useState } from 'react';
import s from './basicfeatures.module.scss';
import { MenuItem, TextField } from '@mui/material';
import { Field } from 'formik';

const makes = ['BMW', 'Audi', 'Lexus', 'Cadillac', 'Ford'];
const models = ['model-1', 'model-2', 'model-3', 'model-4'];
const engine = ['engine-1', 'engine-2', 'engine-3', 'engine-4'];
const color = ['color-1', 'color-2', 'color-3', 'color-4'];
const gearbox = ['manual', 'automatic'];

const BasicFeatures = (props: any) => {
  const [make, setMake] = useState('BMW');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMake(event.target.value);
  };

  return (
    <div className={s.container}>
      <div className="features_wrapper">
        <h2 className="title">
          Tell us basic features <br /> of you car
        </h2>

        <div className="form">
          <Field
            id="car-makes"
            name="item.make"
            select
            // value={type}
            label="Select Make"
            as={TextField}
          >
            {makes.map((make) => (
              <MenuItem key={make} value={make}>
                {make}
              </MenuItem>
            ))}
          </Field>

          <Field
            id="car-models"
            name="item.model"
            label="Model"
            as={TextField}
            select
            // error
            // onChange={handleChange}
            // helperText=""
          >
            {models.map((make) => (
              <MenuItem key={make} value={make}>
                {make}
              </MenuItem>
            ))}
          </Field>

          <div className="hor">
            <Field
              name="item.year"
              label="Year"
              type="number"
              required
              variant="outlined"
              as={TextField}
            />
            <Field
              name="item.mileage"
              label="Mileage"
              type="number"
              required
              variant="outlined"
              as={TextField}
            />
          </div>

          <div className="hor engin_gear">
            <Field name="item.engine" label="Engine" select as={TextField}>
              {engine.map((make) => (
                <MenuItem key={make} value={make}>
                  {make}
                </MenuItem>
              ))}
            </Field>

            <TextField
              // name="item.gearbox"
              label="GearBox"
              select
              value=""
              // as={TextField}
            >
              {gearbox.map((make) => (
                <MenuItem key={make} value={make}>
                  {make}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <Field name="item.color" label="Body Color" select as={TextField}>
            {color.map((make) => (
              <MenuItem key={make} value={make}>
                {make}
              </MenuItem>
            ))}
          </Field>
        </div>
      </div>
    </div>
  );
};

export default BasicFeatures;
