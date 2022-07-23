import React from 'react';
import s from './registrationconfirmationmodal.module.scss';
import { SignUpHeader } from '@/components/common/RegistrationModal/components';
import { CheckCircle } from '@mui/icons-material';
import { Button } from '@mui/material';

const ConfirmationModal = () => {
  return (
    <div className={s.container}>
      <SignUpHeader text="Sign Up" />

      <div className="thank_wrapper">
        <CheckCircle fontSize="large" className="icon" />

        <h2>Thank You!</h2>
        <p>We sent you an email </p>

        <Button variant="contained" className="in_btn" size="large" fullWidth>
          Go To Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
