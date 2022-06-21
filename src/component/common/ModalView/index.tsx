import React from 'react';
import s from './modalview.module.scss';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import {
  CheckCircle,
  Facebook,
  Google,
  Mail,
  RadioButtonChecked,
  RadioButtonUnchecked,
  Twitter,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

const ButtonWithStartIcon = ({ icon: Icon, text }: any) => {
  return (
    <Button
      variant="outlined"
      startIcon={<Icon />}
      color="secondary"
      size="large"
      className={s.btn}
    >
      {text}
    </Button>
  );
};

const SignUpHeader = ({ text }: any) => {
  return (
    <header className={s.signup_header}>
      <h3 className="title">{text}</h3>
    </header>
  );
};

const TextCheckBox = ({ text, ...props }: any) => {
  return (
    <FormControlLabel
      label={text}
      control={
        <Checkbox
          icon={<RadioButtonUnchecked />}
          checkedIcon={<RadioButtonChecked />}
        />
      }
      {...props}
    />
  );
};

const ModalView = () => {
  const [values, setValues] = React.useState<any>({
    showPassword: false,
  });

  return (
    <div className={s.container}>
      <div className="sign_in">
        <SignUpHeader text="Sign Up" />

        <div className="sign_in_wrapper">
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

              <TextField
                id="password"
                label="Password"
                type={values.showPassword ? 'text' : 'password'}
                required
                variant="outlined"
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

              <div className="helper">
                <TextCheckBox text="Remember Me" />

                <Button color="secondary">Recover Password</Button>
              </div>
              <Button variant="contained" className="in_btn" size="large">
                Sign In
              </Button>
            </div>

            <div className="or">
              <p>or</p>
            </div>

            <div className="providers">
              <ButtonWithStartIcon icon={Google} text="Sign Up with Google" />
              <ButtonWithStartIcon
                icon={Facebook}
                text="Sign Up with Facebook"
              />
              <ButtonWithStartIcon icon={Twitter} text="Sign Up with Twitter" />
            </div>
          </div>
        </div>

        <div className="no_account">
          <p>
            You don&apos;t have an account?{' '}
            <Button color="secondary">Sign Up</Button>
          </p>
        </div>
      </div>

      <div className={s.thank_you}>
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
    </div>
  );
};

export default ModalView;
