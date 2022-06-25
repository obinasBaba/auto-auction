import s from './components.module.scss';
import React from 'react';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material';

type Component = React.FC<Record<string, any>>;

export const SignUpHeader: Component = ({ text }) => {
  return (
    <header className={s.signup_header}>
      <h3 className="title">{text}</h3>
    </header>
  );
};

export const SignFooter: Component = ({ text, ...props }) => {
  return (
    <div className={s.no_account}>
      <p>
        You don&apos;t have an account?{' '}
        <Button color="secondary" {...props}>
          {text}
        </Button>
      </p>
    </div>
  );
};

export const TextCheckBox: Component = ({ text, ...props }: any) => {
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

export const ProvidersButton: Component = ({
  icon: Icon,
  text,
  ...props
}: any) => {
  return (
    <Button
      variant="outlined"
      startIcon={<Icon />}
      color="secondary"
      size="large"
      className={s.prov_btn}
      {...props}
    >
      {text}
    </Button>
  );
};
