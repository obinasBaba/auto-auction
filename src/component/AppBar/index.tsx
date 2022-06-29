import React from 'react';
import s from './appbar.module.scss';
import { Avatar, Box, Button, Slide, useScrollTrigger } from '@mui/material';
import { useUI } from '@/component/ui/context';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { AnimatePresence, LayoutGroup, motion, Variants } from 'framer-motion';
import Profile from './Profile';
import Logo from '@/public/logo.svg';

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
  const { data: session } = useSession();
  const { pathname } = useRouter();

  return (
    <HideOnScroll>
      <Box className={s.container}>
        <Link href={'/'}>
          <a>
            <Avatar src={'./logo.svg'} className="logo" />
          </a>
        </Link>

        <LayoutGroup id="id1">
          <motion.div className="tools" layout>
            <AnimatePresence
              exitBeforeEnter
              custom={{ globalObj: {} }}
              presenceAffectsLayout={false}
            >
              {session && pathname !== '/dashboard' && (
                <motion.div
                  variants={btnVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Link href={'/dashboard'}>
                    <a>
                      <Button variant="contained" size="large">
                        Dashboard
                      </Button>
                    </a>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {!session ? (
              <Button variant="outlined" size="large" onClick={ctx.toggleModal}>
                Sign Up
              </Button>
            ) : (
              <Profile session={session} key={'rof'} />
            )}
          </motion.div>
        </LayoutGroup>
      </Box>
    </HideOnScroll>
  );
};

export default AppBar;
