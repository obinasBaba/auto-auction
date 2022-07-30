import React from 'react';
import s from './basicfeatures.module.scss';
import { MenuItem, TextField } from '@mui/material';
import { Field } from 'formik';
import { StepHeader } from '@/scenes/ListingPage/components';
import { ListingFormStepComponent } from '@/scenes/ListingPage';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { motion } from 'framer-motion';

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
const titles = [
  'Clean', //Everything is okay and the car is in good shape structurally.
  'Salvage', //wrecked car that you may have trouble getting insurance for because of damage.
  'Rebuilt, Rebuildable & Reconstructed', // If a salvaged car has been fixed enough to drive safely,
  'Clear', //  There is no debt against the car.
];
const condition = ['used', 'new'];
const driveType = ['4WD', 'AWD', 'FWD', 'RWD'];

const BasicFeatures: ListingFormStepComponent = ({ formikProps }) => {
  return (
    <motion.div layout className={s.container}>
      <motion.div layout className="features_wrapper">
        <StepHeader text="Tell us basic features <br /> of you car" />

        <motion.div layout className="form">
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

          <motion.div layout className="hor">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                views={['year']}
                label="Pick year"
                value={formikProps.values.itemDetail.year}
                minDate={moment('2012-03-01')}
                maxDate={moment('2022-02-02')}
                onChange={(value) =>
                  formikProps.setFieldValue('itemDetail.year', value)
                }
                renderInput={(params) => (
                  <Field
                    id="car-models"
                    {...params}
                    name="itemDetail.year"
                    label="Year"
                    // type="number"
                    as={TextField}
                  />
                )}
              />
            </LocalizationProvider>

            <Field
              name="itemDetail.mileage"
              label="Mileage"
              type="number"
              required
              inputMode="numeric"
              variant="outlined"
              error={Boolean(formikProps.errors.itemDetail?.mileage)}
              FormHelperTextProps={{
                children: 'boo',
              }}
              helperText={formikProps.errors.itemDetail?.mileage}
              as={TextField}
            />
          </motion.div>

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
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BasicFeatures;
