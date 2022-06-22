import React, { useState } from 'react';
import s from './vehiclelocation.module.scss';
import { MenuItem, TextField } from '@mui/material';
import { ControlButtons } from '@/scenes/ListingPage/components';

const VehicleLocation = (props: any) => {
  const countries = ['one', 'two', 'three'];

  const [country, setCountry] = useState(countries[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  return (
    <div className={s.container}>
      <div className="location_wrapper">
        <h2 className="title">
          Where&apos;s your vehicle <br /> located?
        </h2>

        <div className="form">
          <TextField
            id="Town"
            select
            label="Select Town"
            // error
            value={country}
            onChange={handleChange}
            // helperText=""
          >
            {countries.map((make) => (
              <MenuItem key={make} value={make}>
                {make}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="car-models"
            variant="outlined"
            label="Street Address"
          />

          <TextField
            id="car-models"
            variant="outlined"
            label="Suite, apartment number"
          />

          <div className="state">
            <TextField
              id="year"
              label="State"
              type="text"
              required
              variant="outlined"
            />
            <TextField
              id="mileage"
              label="ZipCode"
              type="number"
              required
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleLocation;
