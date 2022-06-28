import React, { useState } from 'react';
import s from './additionalfeatures.module.scss';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
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

const featureWrapperVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const MotionWrapper = ({ children, ...props }: any) => (
  <motion.div initial="initial" animate="animate" exit="exit" {...props}>
    {children}
  </motion.div>
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
            <Button
              // variant="outlined"
              className={clsx({ [s.active]: active === 0 })}
              color="secondary"
              type="button"
              onClick={() => setActive(0)}
            >
              Comfort
              {active === 0 && (
                <motion.div layoutId="border" className="border" />
              )}
            </Button>

            <Button
              // variant="outlined"
              color="secondary"
              type="button"
              className={clsx({ [s.active]: active === 1 })}
              onClick={() => setActive(1)}
            >
              Technologies
              {active === 1 && (
                <motion.div layoutId="border" className="border" />
              )}
            </Button>
          </div>

          <div className="feat_items">
            <AnimatePresence exitBeforeEnter>
              {active === 0 && (
                <MotionWrapper variants={featureWrapperVariant} key="comfort">
                  <>
                    <FeatureCheckBox label="Seat heater" checked />
                    <FeatureCheckBox label="Leather seats" checked />
                    <FeatureCheckBox label="Navigation system" checked />
                    <FeatureCheckBox label="Air conditioner" />
                    <FeatureCheckBox label="Parking control" />
                  </>
                </MotionWrapper>
              )}
              {active === 1 && (
                <MotionWrapper
                  variants={featureWrapperVariant}
                  key="technology"
                >
                  <FeatureCheckBox label="Rear view camera" checked />
                  <FeatureCheckBox label="Multimedia system" checked />
                  <FeatureCheckBox label="Media player" />
                  <FeatureCheckBox label="Central lock" />
                  <FeatureCheckBox label="Alloy Wheels" />
                </MotionWrapper>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalFeatures;
