import React, { useEffect } from 'react';
import s from './signupmodal.module.scss';
import {
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
} from '@mui/material';
import { Google, Mail, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  ProvidersButton,
  SignUpFooter,
  SignUpHeader,
  TextCheckBox,
} from '@/components/common/RegistrationModal/components';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { useUI } from '@/context/ui/context';
import { useSnackbar } from 'notistack';
import { setUserToken } from '@/helpers/tokens';
import { useAppContext } from '@/context';

const SIGN_UP = gql`
  mutation SignUp($input: UserInput!) {
    userCreate(input: $input) {
      errors {
        message
      }
      user {
        id
        email
        firstName
        LastName
      }
      authToken
    }
  }
`;

const SignUpModal = ({ switchModal }: any) => {
  const { closeModal } = useUI();
  const { refetch } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const [sendQuery, { loading, data, error, client }] = useMutation(
    SIGN_UP,
    {},
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      // rememberMe: true,
    },
    onSubmit: (values) => {
      sendQuery({
        variables: {
          input: { ...values, userName: values.firstName },
        },
      })
        .then(({ errors: gErrors, data, context, extensions }) => {
          const { errors, user, authToken } = data.userCreate;
          if (errors?.length > 0 || gErrors) {
            console.log('error', errors, gErrors);
            enqueueSnackbar(gErrors?.toString(), { variant: 'error' });
            for (const error1 of errors) {
              enqueueSnackbar(error1?.message, { variant: 'error' });
            }

            return;
          }
          setUserToken(authToken);
          refetch().then(() => {
            enqueueSnackbar('logged in as --');
            closeModal();
          });
        })
        .catch((error) => {
          console.log('signup error: ', JSON.stringify(error, null, 2));
          enqueueSnackbar(`something is wrong: ${error.message}`, {
            variant: 'error',
          });
        });
    },
  });

  const [values, setValues] = React.useState<any>({
    showPassword: false,
  });

  useEffect(() => {
    console.log('data', data, loading, error?.networkError);
  }, [loading, data, error]);

  return (
    <motion.div className={s.container} layout>
      <SignUpHeader text="Sign Up" />

      <div className="sign_up_wrapper">
        <div className="content">
          <form className="form" onSubmit={formik.handleSubmit}>
            <TextField
              id="email"
              label="Email"
              type="email"
              fullWidth
              required
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Mail />
                  </InputAdornment>
                ),
              }}
            />

            <div className="hor">
              <TextField
                name="firstName"
                label="First name"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                required
              />
              <TextField
                name="lastName"
                label="Last name"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                required
              />
            </div>

            <TextField
              id="password"
              label="Password"
              type={values.showPassword ? 'text' : 'password'}
              required
              fullWidth
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={(_) =>
                        setValues({ showPassword: !values.showPassword })
                      }
                      // edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextCheckBox
              className="agree"
              text="I agree with terms & conditions"
            />

            <Button
              variant="contained"
              className="in_btn"
              size="large"
              type="submit"
            >
              Sign Up
            </Button>
          </form>

          <div className="or">
            <p>or</p>
          </div>

          <div className="providers">
            <ProvidersButton icon={Google} text="Continue with Google" />
          </div>
        </div>
      </div>

      <SignUpFooter text="Sign In" onClick={() => switchModal()} />

      <LinearProgress className="progress" />
    </motion.div>
  );
};

export default SignUpModal;
