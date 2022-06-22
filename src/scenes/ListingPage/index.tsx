import React, { useEffect, useState } from 'react';
import s from './listingpage.module.scss';
import WhatKindVehicle from '@/scenes/ListingPage/WhatKindVehicle';
import BasicFeatures from '@/scenes/ListingPage/BasicFeatures';
import VehicleLocation from '@/scenes/ListingPage/VehicleLocation';
import VehiclePhoto from '@/scenes/ListingPage/VehiclePhoto';
import VehicleDescription from '@/scenes/ListingPage/VehicleDescription';
import AuctionRules from '@/scenes/ListingPage/AuctionRules';
import { motion } from 'framer-motion';
import AdditionalFeatures from '@/scenes/ListingPage/AdditionalFeatures';
import ListingCreated from '@/scenes/ListingPage/ListingCreated';
import { Button } from '@mui/material';
import clsx from 'clsx';

const containerVariants = {};

const wrapperVariants = {
  initial: {
    opacity: 0,
    scale: 0.87,
    y: -10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.92,
  },
};

const steps = [
  { name: 'KIND', component: (props: any) => <WhatKindVehicle {...props} /> },
  { name: 'FEATURE', component: (props: any) => <BasicFeatures {...props} /> },
  {
    name: 'FEATURE_2',
    component: (props: any) => <AdditionalFeatures {...props} />,
  },
  {
    name: 'LOCATION',
    component: (props: any) => <VehicleLocation {...props} />,
  },
  { name: 'PHOTOS', component: (props: any) => <VehiclePhoto {...props} /> },
  {
    name: 'DESCRIPTION',
    component: (props: any) => <VehicleDescription {...props} />,
  },
  { name: 'RULE', component: (props: any) => <AuctionRules {...props} /> },
  { name: 'CREATED', component: (props: any) => <ListingCreated {...props} /> },
];

const ListingPage = () => {
  const [idx, setIdx] = useState(0);
  const [activeStep, setActiveStep] = useState<typeof steps[number]>({
    ...steps[0],
  });

  const nextStep = () => {
    setActiveStep(steps[idx + 1]);
    setIdx(idx + 1);
  };

  const prevStep = () => {
    setActiveStep(steps[idx - 1]);
    setIdx(idx - 1);
  };

  const setStep = (n: number) => {
    setActiveStep(steps[n]);
  };

  useEffect(() => {
    // setActiveStep(steps[0]);
  }, []);

  return (
    <motion.div
      className={s.container}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="steps_wrapper"
        variants={wrapperVariants}
        key={activeStep.name}
      >
        {activeStep.component({ controller: { nextStep, prevStep, setStep } })}
      </motion.div>

      {idx != steps.length - 1 && (
        <motion.div className={s.control_btn} layout>
          {idx !== 0 && (
            <Button
              variant="contained"
              className="in_btn"
              size="large"
              color="secondary"
              onClick={() => prevStep()}
            >
              Back
            </Button>
          )}

          <Button
            variant="contained"
            size="large"
            className={clsx([{ [s.alone]: idx === 0 }])}
            onClick={() => nextStep()}
          >
            Next
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ListingPage;
