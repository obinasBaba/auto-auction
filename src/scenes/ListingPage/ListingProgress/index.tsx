import React, { useEffect, useState } from 'react';
import s from './listingprogress.module.scss';
import {
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

const ListingProgress = ({ currentIdx, lastIdx }: any) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  const isCompleted = (step: number) => {
    return;
    switch (step) {
      case 0:
        return currentIdx >= 3;
      case 1:
        return currentIdx >= 6;
      case 2:
        return currentIdx >= 7;
      default:
        return false;
    }
  };

  const height = useTransform<number, number>(
    new MotionValue(currentIdx),
    (value) => {
      switch (activeStep) {
        case 0:
          return map(currentIdx, 0, 3, 10, 100);
        case 1:
          return map(currentIdx, 3, 6, 10, 100);
        case 2:
          return map(currentIdx, 6, 7, 10, 100);
        case 3:
          return map(currentIdx, 7, 8, 10, 100);

        default:
          return 0;
      }
    },
  );

  const template = useMotionTemplate`${height}%`;

  useEffect(() => {
    switch (currentIdx) {
      case 0:
      case 1:
      case 2:
        return setActiveStep(0);
      case 3:
      case 4:
      case 5:
        setCompleted([0]);
        return setActiveStep(1);
      case 6:
        setCompleted([0, 1]);
        return setActiveStep(2);
      case 7:
        setCompleted([0, 1, 2, 3]);
        return setActiveStep(3);
      default:
        setActiveStep(0);
    }
  }, [currentIdx]);

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
            completed={completed.includes(index)}
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
                {activeStep != steps.length - 1 && (
                  <>
                    <div className="bg_line" />
                    <motion.div
                      className="p_line"
                      style={{ height: template }}
                    />
                  </>
                )}
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </motion.div>
  );
};

export default ListingProgress;
