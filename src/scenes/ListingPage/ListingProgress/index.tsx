import React from 'react';
import s from './listingprogress.module.scss';
import {
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';

const steps = [
  {
    label: 'Year, make, mileage, VIN code, etc',
    description: 'Set Vehicles Details',
  },
  {
    label: 'Photos, description and more',
    description: 'Set the overall look',
  },
  {
    label: 'Dates, prices and conditions',
    description: 'Set prices and auctions',
  },
];

const ListingProgress = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <motion.div className={s.container} layout>
      <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              onClick={handleStep(index)}
              optional={<Typography variant="caption">{step.label}</Typography>}
            >
              {step.description}
            </StepLabel>
            <StepContent>
              <div className={s.step_content} />
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </motion.div>
  );
};

export default ListingProgress;
