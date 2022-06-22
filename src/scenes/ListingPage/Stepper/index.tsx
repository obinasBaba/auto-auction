import React from 'react';
import s from './stepper.module.scss';
import {
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper as Steps,
  Typography,
} from '@mui/material';

const steps = [
  {
    label: 'Set Vehicles Details',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Set the overall look',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Set prices and auctions',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

const Stepper = () => {
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
    <div className={s.container}>
      <Steps
        activeStep={activeStep}
        // orientation="horizontal"
        // nonLinear
        // alternativeLabel
        className="stepper"
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              // sx={{border: 1}}
              // StepIconComponent={CheckCircle}
              onClick={handleStep(index)}
              optional={<Typography variant="caption">Last step</Typography>}
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {/*<Typography>{step.description}</Typography>*/}
            </StepContent>
          </Step>
        ))}
      </Steps>

      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default Stepper;
