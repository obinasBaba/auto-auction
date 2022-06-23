import React from 'react';
import s from './appbar.module.scss';
import { Avatar, Box, Button, Slide, useScrollTrigger } from '@mui/material';
import { useUI } from '@/component/ui/context';
import Link from 'next/link';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const AppBar = () => {
  const ctx = useUI();

  return (
    <HideOnScroll>
      <Box className={s.container}>
        <Link href={'/'}>
          <a>
            <Avatar src="./logo.svg" className="logo" />
          </a>
        </Link>

        <div className="sign_up">
          <Avatar src="/broken-image.jpg" />
          <Button variant="outlined" size="large" onClick={ctx.toggleModal}>
            Sign Up
          </Button>
        </div>
      </Box>
    </HideOnScroll>
  );
};

export default AppBar;
