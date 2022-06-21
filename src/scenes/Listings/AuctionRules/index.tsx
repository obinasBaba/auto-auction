import React from 'react';
import s from './auctionrules.module.scss';
import { Button, FormControlLabel, Switch, TextField } from '@mui/material';

const AuctionRules = () => {
  return (
    <div className={s.container}>
      <div className="wrapper">
        <h2 className="title">
          Set auction rules for <br /> your vehicle
        </h2>

        <div className="form">
          <div className="hor">
            <Button variant="outlined" color="secondary">
              Enable auction
            </Button>
            <Button color="secondary">Disable auction</Button>
          </div>

          <TextField
            id="year"
            label="Year"
            type="date"
            required
            variant="outlined"
          />

          <FormControlLabel
            className="checkbox"
            value="fixed"
            control={<Switch color="primary" />}
            label="Fixed minimal price"
            labelPlacement="start"
          />

          <FormControlLabel
            className="checkbox"
            value="sale"
            control={<Switch color="primary" />}
            label="Instant sale"
            labelPlacement="start"
          />

          <FormControlLabel
            className="checkbox"
            value="flexible"
            control={<Switch color="primary" />}
            label="Flexible price"
            labelPlacement="start"
          />
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

export default AuctionRules;
