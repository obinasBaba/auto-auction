import React from 'react';
import s from './appbar.module.scss';
import { Avatar, Box, Slide, useScrollTrigger } from '@mui/material';

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
  return (
    <HideOnScroll>
      <Box className={s.container} sx={{ border: 1 }}>
        <Avatar src="/broken-image.jpg" />
        <Avatar src="/broken-image.jpg" />
      </Box>
    </HideOnScroll>
  );
};

export default AppBar;
