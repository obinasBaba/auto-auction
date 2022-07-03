import React from 'react';
import s from './components.module.scss';
import { Button } from '@mui/material';

export const ControlButtons = ({ controller: { prevStep, nextStep } }: any) => {
  return (
    <div className={s.control_btn}>
      <Button
        variant="contained"
        className="in_btn"
        size="large"
        color="secondary"
        onClick={() => prevStep()}
      >
        Back
      </Button>

      <Button
        variant="contained"
        className="in_btn"
        size="large"
        onClick={() => nextStep()}
      >
        Next
      </Button>
    </div>
  );
};

export const StepHeader = ({ text }: any) => {
  return (
    <h2 className={s.step_header} dangerouslySetInnerHTML={{ __html: text }} />
  );
};
