import React, { useEffect } from 'react';
import s from './signin.module.scss';
import { motion } from 'framer-motion';
import {
  Button,
  InputAdornment,
  LinearProgress,
  TextField,
} from '@mui/material';
import { Icecream } from '@mui/icons-material';
import { useFormik } from 'formik';
import VehiclePhoto from '@/scenes/ListingPage/VehiclePhoto';
import clsx from 'clsx';
import { useSnackbar } from 'notistack';
import { gql, useMutation } from '@apollo/client';
import useError from '@/helpers/useError';
import { useAppContext } from '@/context';
import { useRouter } from 'next/router';

const CREATE_MERCHANT = gql`
  mutation ($input: MerchantInput!) {
    merchantCreate(input: $input) {
      merchant {
        id
        licenceUrl
        verified
      }
      errors {
        message
      }
    }
  }
`;

const SignIn = ({}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const {
    currentUser: { id, merchantId, permission },
    refetch,
  } = useAppContext();
  const [createMerchant, { data, error, loading }] =
    useMutation(CREATE_MERCHANT);

  useError(error, data);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      images: [] as any[],
    },
    onSubmit: (values) => {
      console.log('submit: ', values);

      if (!values?.images[0]?.url) {
        enqueueSnackbar('upload your licence please', { variant: 'error' });
        // return;
      }

      createMerchant({
        variables: {
          input: {
            licenceUrl:
              values?.images[0]?.url ||
              'https://res.cloudinary.com/dltkxbnvk/image/upload/v1657284965/2015_NISSAN%20SENTRA%20S/0-47399232_Image_1.jpg.jpg',
          },
        },
      }).then(({ data, errors }) => {
        refetch();
        console.log('data: ', data, errors);
        if (errors && errors.length > 0) {
          return enqueueSnackbar(errors[0].message, {
            variant: 'error',
          });
        }

        if (data) {
          enqueueSnackbar('your merchant account created', {
            variant: 'success',
          });
          refetch();
        }
      });
    },
  });

  useEffect(() => {
    if (permission === 'accepted') {
      router.push('/dashboard');
    }

    if (permission === 'rejected') {
      enqueueSnackbar(
        'Your business account has been rejected please apply again',
        {
          variant: 'error',
          autoHideDuration: 7,
        },
      );
    }

    // formik.handleChange
  }, [permission]);

  return (
    <div className={clsx([s.container])}>
      <motion.div className="wrapper" layout>
        {permission === 'new' || permission !== 'applied' ? (
          <>
            <header>
              <h1 className="title">
                Sign Up for business account {permission}{' '}
              </h1>
            </header>

            <div className="sign_in_wrapper">
              <div className="content">
                <form className="form" onSubmit={formik.handleSubmit}>
                  <TextField
                    label="licence id"
                    type="text"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Icecream />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <VehiclePhoto
                    formikProps={formik as any}
                    uploadPath="auth"
                    title="Drop your licence photo"
                  />

                  <Button
                    variant="contained"
                    className="in_btn"
                    size="large"
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>

            <LinearProgress className="progress" />
          </>
        ) : (
          <div className="text">
            <h2>your business account successfully created </h2>
            <p>
              wait for a verification to arrive{' '}
              <small>( 1-2 business day )</small>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SignIn;
