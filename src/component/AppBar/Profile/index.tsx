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
  HeadsetMic,
  Logout,
  Settings,
  SwitchAccessShortcutAddOutlined,
} from '@mui/icons-material';
import { Session } from 'next-auth';

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

const Profile = ({ session }: { session: Session }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);
  const items = [
    { name: 'Profile Settings', Icon: Settings },
    { name: 'Help Center', Icon: HeadsetMic },
    { name: 'Switch to Seller', Icon: SwitchAccessShortcutAddOutlined },
    { name: 'Log Out', Icon: Logout },
  ];

  useEffect(() => {
    console.log('show: ', show);
    containerRef.current?.focus({ preventScroll: true });
  }, [show]);

  return (
    <motion.div className={s.container} layout>
      <IconButton color="primary" onClick={() => setShow(!show)}>
        <Avatar className="pp" src={session?.user?.image ?? '/'} />
      </IconButton>

      <AnimatePresence exitBeforeEnter custom={{ globalObj: {} }}>
        {show && (
          <motion.div
            className="profile_popup"
            variants={popupVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onBlur={() => {
              setShow(false);
            }}
          >
            <List component="nav" aria-label="main mailbox folders">
              {items.slice(0, 2).map(({ name, Icon }) => (
                <ListItemButton
                  key={name}
                  className="list_item_btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              ))}
            </List>
            <Divider sx={{ marginLeft: '1rem' }} />
            <List component="nav" aria-label="secondary mailbox folder">
              {items.slice(2).map(({ name, Icon }) => (
                <ListItemButton key={name} className="list_item_btn">
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              ))}
            </List>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default memo(Profile);
