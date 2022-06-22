import React from 'react';
import s from './signupmodal.module.scss';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Facebook, Google, Mail, Twitter } from '@mui/icons-material';
import {
  ProvidersButton,
  SignFooter,
  SignUpHeader,
  TextCheckBox,
} from '@/component/common/ModalView/components';

const SignUpModal: React.FC<{ switchModal: (name: any) => void }> = ({
  switchModal,
}) => {
  return (
    <div className={s.container}>
      <SignUpHeader text="Sign Up" />

      <div className="wrapper">
        <div className="content">
          <div className="form">
            <TextField
              id="email"
              label="Email"
              type="email"
              required
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Mail />
                  </InputAdornment>
                ),
              }}
            />

            <TextCheckBox
              className="agree"
              text="I agree with terms & conditions"
            />

            <Button variant="contained" className="in_btn" size="large">
              Sign Up
            </Button>
          </div>

          <div className="or">
            <p>or</p>
          </div>

          <div className="providers">
            <ProvidersButton icon={Google} text="Sign Up with Google" />
            <ProvidersButton icon={Facebook} text="Sign Up with Facebook" />
            <ProvidersButton icon={Twitter} text="Sign Up with Twitter" />
          </div>
        </div>
      </div>

      <SignFooter text="Sign In" onClick={() => switchModal('SIGN_IN')} />
    </div>
  );
};

export default SignUpModal;
