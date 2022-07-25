import React from 'react';
import s from './basicfeatures.module.scss';
import { MenuItem, TextField } from '@mui/material';
import { Field } from 'formik';
import { StepHeader } from '@/scenes/ListingPage/components';
import { ListingFormStepComponent } from '@/scenes/ListingPage';

const makes = ['BMW', 'Audi', 'Lexus', 'Cadillac', 'Ford'];
const models = [
  'Airwave',
  'Lagreat',
  'MR-V',
  'N360',
  'N600',
  'N Box',
  'Avancier',
];
const engine = ['engine-1', 'engine-2', 'engine-3', 'engine-4'];
const titles = [
  'Clean', //Everything is okay and the car is in good shape structurally.
  'Salvage', //wrecked car that you may have trouble getting insurance for because of damage.
  'Rebuilt, Rebuildable & Reconstructed', // If a salvaged car has been fixed enough to drive safely,
  'Clear', //  There is no debt against the car.
];
const condition = ['used', 'new'];
const driveType = ['4WD', 'AWD', 'FWD', 'RWD'];

const years = [
  1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002,
  2004, 2005, 2006, 2007,
];

const BasicFeatures: ListingFormStepComponent = ({ formikProps }) => {
  const { errors } = formikProps;

  return (
    <div className={s.container}>
      <div className="features_wrapper">
        <StepHeader text="Tell us basic features <br /> of you car" />

        <div className="form">
          <Field
            id="car-makes"
            name="itemDetail.make"
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
            name="itemDetail.model"
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
              name="itemDetail.year"
              label="Year"
              type="number"
              select
              required
              variant="outlined"
              as={TextField}
              error={!!errors?.itemDetail?.year}
              helperText={errors?.itemDetail?.year}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.6,
                    },
                  },
                },
              }}
            >
              {years.map((make) => (
                <MenuItem key={make} value={make}>
                  {make}
                </MenuItem>
              ))}
            </Field>
            <Field
              name="itemDetail.mileage"
              label="Mileage"
              type="number"
              required
              variant="outlined"
              as={TextField}
            />
          </div>

          <div className="hor engin_gear">
            <Field
              name="itemDetail.driveType"
              label="Drive Type"
              select
              as={TextField}
            >
              {driveType.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Field>

            <Field
              name="itemDetail.condition"
              label="condition"
              select
              required
              as={TextField}
            >
              {condition.map((make) => (
                <MenuItem key={make} value={make}>
                  {make}
                </MenuItem>
              ))}
            </Field>
          </div>

          <Field
            name="itemDetail.title"
            label="Vehicle Title"
            select
            required
            as={TextField}
          >
            {titles.map((title) => (
              <MenuItem key={title} value={title}>
                {title}
              </MenuItem>
            ))}
          </Field>
        </div>
      </div>
    </div>
  );
};

export default BasicFeatures;
