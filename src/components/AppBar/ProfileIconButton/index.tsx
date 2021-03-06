import React, { memo, useEffect, useRef, useState } from 'react';
import s from './profile.module.scss';
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import {
  HeadsetMicTwoTone,
  LogoutTwoTone,
  ManageAccountsTwoTone,
  SwitchAccessShortcutAddOutlined,
} from '@mui/icons-material';
import Link from 'next/link';
import { useAppContext } from '@/context';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

const popupVariants: Variants = {
  initial: {
    scale: 0.8,
    x: 20,
    y: -20,
    opacity: 0,
  },
  animate: {
    scale: 1,
    x: 0,
    y: 0,
    opacity: 1,
  },

  exit: {
    opacity: 0,
    scale: 0.7,
    x: 50,
    y: -50,
    transition: {
      opacity: {
        duration: 0.2,
      },
      default: {
        type: 'spring',
      },
    },
  },
};

const ItemButton = (props: any) => '';

const ProfileIconButton = (props: any) => {
  const {
    currentUser: { merchantId, verified, id, email, permission },
  } = useAppContext();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [show, setShow] = useState<boolean>(false);

  const { switchToBusiness, businessAccount, logOut } = useAppContext();

  useEffect(() => {
    containerRef.current?.focus({ preventScroll: true });
  }, [show]);

  return (
    <motion.div className={s.container} layout>
      <IconButton color="primary" onClick={() => setShow(!show)}>
        <Avatar className="pp">{email?.at(0)}</Avatar>
      </IconButton>

      <AnimatePresence exitBeforeEnter custom={{ globalObj: {} }}>
        {show && (
          <motion.div
            className="profile_popup"
            variants={popupVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            tabIndex={0}
            ref={containerRef}
            onBlur={(e) => {
              if (e.relatedTarget === null) setShow(false);
            }}
          >
            <List component="nav" aria-label="main mailbox folders">
              <Link href={'/dashboard/profile'}>
                <a>
                  <ListItemButton
                    className="list_item_btn"
                    onClick={() => setShow(false)}
                  >
                    <ListItemIcon>
                      <ManageAccountsTwoTone />
                    </ListItemIcon>
                    <ListItemText primary="Profile Settings" />
                  </ListItemButton>
                </a>
              </Link>

              <ListItemButton className="list_item_btn">
                <ListItemIcon>
                  <HeadsetMicTwoTone />
                </ListItemIcon>
                <ListItemText primary="Help Center" />
              </ListItemButton>
            </List>
            <Divider sx={{ marginLeft: '1rem' }} />
            <List component="nav" aria-label="secondary mailbox folder">
              <ListItemButton
                className="list_item_btn"
                onClick={() => {
                  switchToBusiness();
                  setTimeout(() => setShow(false), 0);
                  return;
                  if (merchantId && permission === 'accepted') {
                    switchToBusiness();
                    setShow(false);
                  } else {
                    router.push('/auth/sign-in').then(() => {
                      enqueueSnackbar('You need to create a business account', {
                        variant: 'warning',
                      });
                      setShow(false);
                    });
                  }
                }}
              >
                <ListItemIcon>
                  <SwitchAccessShortcutAddOutlined />
                </ListItemIcon>
                <ListItemText primary="Switch to Seller" />
              </ListItemButton>

              <ListItemButton
                className="list_item_btn"
                onClick={() => logOut()}
              >
                <ListItemIcon>
                  <LogoutTwoTone />
                </ListItemIcon>
                <ListItemText primary="LogOut" />
              </ListItemButton>
            </List>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(ProfileIconButton);
