import React, { useState } from 'react';
import s from './basicfeatures.module.scss';
import { Button, MenuItem, TextField } from '@mui/material';

const BasicFeatures = () => {
  const makes = ['BMW', 'Audi', 'Lexus', 'Cadillac', 'Ford'];

  const [make, setMake] = useState(makes[0]);

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
          <TextField
            id="car-makes"
            select
            label="Select Make"
            // error
            value={make}
            onChange={handleChange}
            // helperText=""
          >
            {makes.map((make) => (
              <MenuItem key={make} value={make}>
                {make}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="car-models"
            select
            label="Model"
            // error
            value={make}
            // onChange={handleChange}
            // helperText=""
          >
            {makes.map((make) => (
              <MenuItem key={make} value={make}>
                {make}
              </MenuItem>
            ))}
          </TextField>

          <div className="year_mile">
            <TextField
              id="year"
              label="Year"
              type="date"
              required
              variant="outlined"
            />
            <TextField
              id="mileage"
              label="Mileage"
              type="number"
              required
              variant="outlined"
            />
          </div>

          <div className="year_mile engin_gear">
            <TextField id="car-models" select label="Engine" value="">
              {makes.map((make) => (
                <MenuItem key={make} value={make}>
                  {make}
                </MenuItem>
              ))}
            </TextField>

            <TextField id="car-models" select label="GearBox" value="">
              {makes.map((make) => (
                <MenuItem key={make} value={make}>
                  {make}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <TextField id="color" select label="Body Color" value="">
            {makes.map((make) => (
              <MenuItem key={make} value={make}>
                {make}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="control">
          <Button
            variant="contained"
            className="in_btn"
            size="large"
            color="secondary"
          >
            Back
          </Button>

          <Button variant="contained" className="in_btn" size="large">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicFeatures;
