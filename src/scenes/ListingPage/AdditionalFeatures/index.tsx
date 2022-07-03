import React, { useEffect, useState } from 'react';
import s from './additionalfeatures.module.scss';
import {
  Checkbox,
  Chip,
  FormControlLabel,
  MenuItem,
  Radio,
  TextField,
} from '@mui/material';
import clsx from 'clsx';
import { StepHeader } from '@/scenes/ListingPage/components';
import { Box } from '@mui/system';
import { ListingFormStepComponent } from '@/scenes/ListingPage';
import { Done } from '@mui/icons-material';
import { Field } from 'formik';

const FeatureCheckBox = ({ label, checked, ...props }: any) => (
  <FormControlLabel
    label={label}
    className={clsx({ [s.checked]: checked })}
    control={
      <Checkbox
      // defaultChecked={checked}
      // disabled={!checked}
      // onChange={formik.handleChange}
      // icon={<RadioButtonUnchecked />}
      // checkedIcon={<RadioButtonChecked />}
      />
    }
  />
);

const comfort = [
  'Seat heater',
  'Leather seats',
  'Navigation system',
  'Air conditioner',
  'Parking control',
  'Rear view camera',
  'Multimedia system',
  'Media player',
  'Central lock',
  'Alloy Wheels',
];
const technology = [
  'Rear view camera',
  'Multimedia system',
  'Media player',
  'Central lock',
  'Alloy Wheels',
];

const cylinders = ['2', '3', '4', '5', '6', '8', '10', '12'];
const fuel = ['Bi-Fuel', 'Biodiesel', 'Diesel', 'Electric', 'Gasoline'];

const side = ['Right-hand', 'Left-hand'];
const colors = [
  'Black',
  'Blue',
  'Brown',
  'Burgundy',
  'Gold',
  'Gray',
  'Green',
  'Red',
  'Tan',
  'Teal',
  'White',
];

const transmission = ['manual', 'automatic'];

const AdditionalFeatures: ListingFormStepComponent = ({ formikProps }) => {
  const { setFieldValue } = formikProps;

  const [selectedFeat, setSelectedFeat] = useState([comfort[2]]);

  useEffect(() => {
    setFieldValue('item.features', selectedFeat);
  }, [selectedFeat, setFieldValue]);

  return (
    <div className={s.container}>
      <div className="wrapper">
        <StepHeader text="What additional <br /> features do you offer?" />

        <div className="form">
          <h4>Engine</h4>

          <div className="hor">
            <Field
              name="item.fuel"
              label="Fuel type"
              select
              as={TextField}
              className="fuel"
            >
              {fuel.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Field>

            <Field
              name="item.cylinder"
              label="no of cylinders"
              select
              as={TextField}
            >
              {cylinders.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Field>
          </div>

          <Field
            name="item.engine_name"
            label="Engine name"
            variant="outlined"
            type="text"
            fullWidth
            as={TextField}
          />

          <h4>Others</h4>

          <div className="hor">
            <Field
              name="item.driveside"
              label="Drive Side"
              select
              as={TextField}
              className="drive"
            >
              {side.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Field>

            <Field
              name="item.transmission"
              label="Transmission"
              select
              as={TextField}
              sx={{ flexGrow: 1.5 }}
            >
              {transmission.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Field>
          </div>

          <div className="hor">
            <Field
              name="item.interior_color"
              label="Interior Color"
              select
              as={TextField}
            >
              {colors.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Field>

            <Field
              name="item.exterior_color"
              label="Exterior Color"
              select
              as={TextField}
            >
              {colors.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Field>
          </div>

          <h4>Additional</h4>
          <div className="chips">
            {comfort.map((value) => (
              <Chip
                className="chip"
                key={value}
                label={value}
                color={
                  selectedFeat.indexOf(value) > -1 ? 'primary' : 'secondary'
                }
                variant="outlined"
                sx={{
                  backgroundColor:
                    selectedFeat.indexOf(value) > -1
                      ? 'rgba(121, 99, 240, 0.08)'
                      : 'rgba(185, 185, 185, 0.24)',
                }}
                deleteIcon={
                  <Radio checked={selectedFeat.indexOf(value) > -1} />
                }
                onDelete={() => {
                  if (selectedFeat.indexOf(value) > -1)
                    setSelectedFeat(
                      selectedFeat.filter((feat) => feat != value),
                    );
                  else setSelectedFeat([value, ...selectedFeat]);
                }}
                onClick={() => {
                  if (selectedFeat.indexOf(value) > -1)
                    setSelectedFeat(
                      selectedFeat.filter((feat) => feat != value),
                    );
                  else setSelectedFeat([value, ...selectedFeat]);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalFeatures;
