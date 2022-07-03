import React, { useEffect } from 'react';
import s from './listingprogress.module.scss';
import {
  Button,
  Paper,
  Step,
  StepConnector,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useTransform,
} from 'framer-motion';
import clsx from 'clsx';
import { map } from '@/scenes/ListingPage/VehiclePhoto';

const steps = [
  {
    label: 'Year, make, mileage, VIN code, etc',
    description: 'Set Vehicles Details',
    idx: 0,
  },
  {
    label: 'Photos, description and more',
    description: 'Set the overall look',
    idx: 1,
  },
  {
    label: 'Dates, prices and conditions',
    description: 'Set prices and auctions',
    idx: 2,
  },
  {
    description: 'Done',
    label: 'Check everything',
    idx: 3,
  },
];

const ListingProgress = ({ idx }: any) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    return true;
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

  const isCompleted = (step: number) => {
    switch (step) {
      case 0:
        return idx >= 3;
      case 1:
        return idx >= 6;
      case 2:
        return idx >= 7;
      default:
        return false;
    }
  };

  const height = useTransform<number, number>(new MotionValue(idx), (value) => {
    switch (activeStep) {
      case 0:
        return map(idx, 0, 3, 10, 100);
      case 1:
        return map(idx, 3, 6, 10, 100);
      case 2:
        return map(idx, 6, 7, 10, 100);
      case 3:
        return map(idx, 7, 8, 10, 100);

      default:
        return 0;
    }
  });

  useEffect(() => {
    switch (idx) {
      case 0:
      case 1:
      case 2:
        return setActiveStep(0);
      case 3:
      case 4:
      case 5:
        return setActiveStep(1);
      case 6:
        return setActiveStep(2);
      case 7:
        return setActiveStep(3);
      default:
        setActiveStep(0);
    }
  }, [idx]);

  return (
    <motion.div className={s.container} layout>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        nonLinear
        connector={<StepConnector data-idx />}
      >
        {steps.map((step, index) => (
          <Step
            key={step.label}
            completed={isCompleted(index)}
            className={clsx({ ['active']: index === activeStep })}
          >
            <StepLabel
              // onClick={handleStep(index)}
              optional={<Typography variant="caption">{step.label}</Typography>}
            >
              {step.description}
            </StepLabel>
            <StepContent>
              <div className={s.step_content}>
                <div className="bg_line" />
                <motion.div
                  className="p_line"
                  style={{ height: useMotionTemplate`${height}%` }}
                />
              </div>
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
