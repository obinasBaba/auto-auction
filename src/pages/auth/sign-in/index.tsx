import React, { useEffect } from 'react';
import s from './signin.module.scss';
import { Typography } from '@mui/material';
import SignInModal from '@/component/common/ModalView/SignInModal';
import { useRouter } from 'next/router';

const SignIn = () => {
  const { callbackUrl, error } = useRouter().query;

  useEffect(() => {
    console.log('callBackurl: ', callbackUrl, 'error: ', error);
  }, [callbackUrl, error]);

  return (
    <div className={s.container}>
      <Typography variant="h2"> SIGN IN </Typography>

      <pre>{JSON.stringify({ callbackUrl, error }, null, 2)}</pre>

      <SignInModal />
    </div>
  );
};

export default SignIn;
