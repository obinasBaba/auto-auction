import React, { useState } from 'react';
import s from './additionalfeatures.module.scss';
import { Checkbox, FormControlLabel } from '@mui/material';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const FeatureCheckBox = ({ label, checked, ...props }: any) => (
  <FormControlLabel
    label={label}
    className={clsx({ [s.checked]: checked })}
    control={
      <Checkbox
        defaultChecked={checked}
        // disabled={!checked}
        // onChange={formik.handleChange}
        // icon={<RadioButtonUnchecked />}
        // checkedIcon={<RadioButtonChecked />}
      />
    }
  />
);

const AdditionalFeatures = (props: any) => {
  const [active, setActive] = useState<number>(0);

  return (
    <div className={s.container}>
      <div className="wrapper">
        <h2 className="title">
          What additional <br /> features do you offer?
        </h2>

        <div className="form">
          <div className="feat_types">
            <button
              // variant="outlined"
              className={clsx({ [s.active]: active === 0 })}
              color="secondary"
              onClick={() => setActive(0)}
            >
              Comfort features
              {active === 0 && (
                <motion.div layoutId="border" className="border" />
              )}
            </button>

            <button
              // variant="outlined"
              color="secondary"
              className={clsx({ [s.active]: active === 1 })}
              onClick={() => setActive(1)}
            >
              Technologies
              {active === 1 && (
                <motion.div layoutId="border" className="border" />
              )}
            </button>
          </div>

          <div className="feat_items">
            <FeatureCheckBox label="Seat heater" checked />
            <FeatureCheckBox label="Leather seats" checked />
            <FeatureCheckBox label="Navigation system" checked />
            <FeatureCheckBox label="Air conditioner" checked />
            <FeatureCheckBox label="Parking control" checked />
            <FeatureCheckBox label="Rear view camera" />
            <FeatureCheckBox label="Multimedia system" />
            <FeatureCheckBox label="Central lock" />
            <FeatureCheckBox label="Alloy Wheels" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalFeatures;
