import React from 'react';
import s from './signinmodal.module.scss';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
} from '@mui/material';
import {
  Google,
  Mail,
  RadioButtonChecked,
  RadioButtonUnchecked,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  ProvidersButton,
  SignFooter,
  SignUpHeader,
  TextCheckBox,
} from '@/components/common/RegistrationModal/components';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  rememberMe: yup.boolean(),
});

const SignInModal = ({ switchModal }: any) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [values, setValues] = React.useState<any>({
    showPassword: false,
  });

  return (
    <motion.div className={s.container} layout>
      <SignUpHeader text="Sign In" />

      <div className="sign_in_wrapper">
        <div className="content">
          <form className="form" onSubmit={formik.handleSubmit}>
            <TextField
              id="email"
              label="Email"
              type="email"
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

            <TextField
              id="password"
              label="Password"
              type={values.showPassword ? 'text' : 'password'}
              required
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

            <div className="helper">
              {/*<TextCheckBox text="Remember Me" />*/}
              <FormControlLabel
                label="Remember Me"
                control={
                  <Checkbox
                    defaultChecked
                    onChange={formik.handleChange}
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<RadioButtonChecked />}
                  />
                }
              />

              <Button color="secondary">Recover Password</Button>
            </div>

            <TextCheckBox className="agree" text="Login as Admin" />

            <Button
              variant="contained"
              className="in_btn"
              size="large"
              type="submit"
            >
              Sign In
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

      <SignFooter text="Sign Up" onClick={() => switchModal()} />

      <LinearProgress className="progress" />
    </motion.div>
  );
};

export default SignInModal;
