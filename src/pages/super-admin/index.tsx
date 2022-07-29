import React, { useState } from 'react';
import s from './super-admin.module.scss';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Mail, Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '@/components/common/RegistrationModal/SignInModal';
import { SignUpHeader } from '@/components/common/RegistrationModal/components';
import SuperAdminDashboard from '@/pages/super-admin/SuperAdminDashboard';

const SuperAdmin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [sendQuery, { loading, data, error }] = useMutation(SIGN_IN);
  const [values, setValues] = React.useState<any>({
    showPassword: false,
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      setAuthenticated(true);
    },
  });

  return (
    <div className={s.container}>
      <div className="wrapper">
        {authenticated ? (
          <SuperAdminDashboard />
        ) : (
          <div className="sign_in_wrapper">
            <div className="content">
              <form className="form" onSubmit={formik.handleSubmit}>
                <SignUpHeader text="Login In" />

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
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
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
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  className="in_btn"
                  size="large"
                  type="submit"
                >
                  Sign In
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdmin;
