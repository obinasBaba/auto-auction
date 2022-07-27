import React, { useEffect } from 'react';
import s from './appbar.module.scss';
import { Avatar, Box, Button, Slide, useScrollTrigger } from '@mui/material';
import { useUI } from '@/context/ui/context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, LayoutGroup, motion, Variants } from 'framer-motion';
import ProfileIconButton from './ProfileIconButton';
import SearchField from '@/components/AppBar/SearchField';
import { MotionWrapper } from '@/components/MotionWrapper';
import Logo from '@/public/logo.svg';
import { useAppContext } from '@/context';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    threshold: 40,
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const btnVariant: Variants = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },

  exit: {
    opacity: 0,
    y: -10,
    transition: {
      opacity: {
        type: 'tween',
      },
      default: {
        type: 'spring',
      },
    },
  },
};

const AppBar = () => {
  const ctx = useUI();
  const { currentUser } = useAppContext();
  const { pathname } = useRouter();

  return (
    <HideOnScroll>
      <Box className={s.container}>
        <Link href="/">
          <a className="logo">
            <Avatar src={Logo.src} className="logo" />
          </a>
        </Link>

        <LayoutGroup id="id1">
          <motion.div className="tools" layout>
            <AnimatePresence
              exitBeforeEnter={false}
              custom={{ globalObj: {} }}
              presenceAffectsLayout={false}
            >
              {currentUser.id && (
                <MotionWrapper layout key="search">
                  <SearchField key="search" />
                </MotionWrapper>
              )}

              {currentUser.id && !pathname.startsWith('/dashboard') && (
                <MotionWrapper variants={btnVariant} layout key="btn">
                  <Link href={'/dashboard'}>
                    <a>
                      <Button variant="contained" size="large">
                        Dashboard
                      </Button>
                    </a>
                  </Link>
                </MotionWrapper>
              )}
            </AnimatePresence>

            {!currentUser.id ? (
              <Button
                variant="outlined"
                className="extra_large"
                size="large"
                onClick={ctx.toggleModal}
              >
                Sign Up
              </Button>
            ) : (
              <ProfileIconButton session={currentUser} key={'rof'} />
            )}
          </motion.div>
        </LayoutGroup>
      </Box>
    </HideOnScroll>
  );
};

export default AppBar;
