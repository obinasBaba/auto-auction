import React from 'react';
import s from './profile.module.scss';
import { GetStaticPropsContext } from 'next';
import { IconButton, Typography } from '@mui/material';
import {
  AccountCircleTwoTone,
  ArrowForward,
  BusinessCenterTwoTone,
  FingerprintTwoTone,
  LockOpenTwoTone,
  MonetizationOnTwoTone,
  NotificationsActiveTwoTone,
  SecurityTwoTone,
  Settings,
} from '@mui/icons-material';
import Link from 'next/link';

export async function getStaticProps({}: GetStaticPropsContext<{
  slug: string;
}>) {
  // return {
  //   notFound: true,
  // };
  return {
    props: {
      headerInfo: {
        index: true,
      },
    },
    revalidate: 200,
  };
}

export const data = [
  {
    title: 'Account Information',
    subTitle: 'Profile pic and name',
    Icon: AccountCircleTwoTone,
    link: 'profile-setting',
  },
  {
    title: 'Security',
    subTitle: 'Your credentials',
    Icon: SecurityTwoTone,
    link: 'profile-setting',
  },
  {
    title: 'Login details',
    subTitle: 'Password & security',
    Icon: FingerprintTwoTone,
    link: 'profile-setting',
  },
  {
    title: 'Billing',
    subTitle: 'Setup payment methods',
    Icon: MonetizationOnTwoTone,
    link: 'profile-setting',
  },
  {
    title: 'Notifications',
    subTitle: 'Your email notification',
    Icon: NotificationsActiveTwoTone,
    link: 'profile-setting',
  },
  {
    title: 'Privacy',
    subTitle: 'Linked apps and services',
    Icon: LockOpenTwoTone,
    link: 'profile-setting',
  },
  {
    title: 'Global preferences',
    subTitle: 'Profile pic and name',
    Icon: Settings,
    link: 'profile-setting',
  },
  {
    title: 'Business account',
    subTitle: 'Team for collaborations',
    Icon: BusinessCenterTwoTone,
    link: 'profile-setting',
  },
];

const Profile = () => {
  return (
    <div className={s.container}>
      <div className="setting_list">
        {data.map(({ title, subTitle, Icon, link }) => (
          <Link href={`/dashboard/profile/${link}`} key={title}>
            <a>
              <div className="setting_card">
                <div className="list_item">
                  <IconButton className="btn" color="secondary">
                    <Icon />
                  </IconButton>
                  <div className="text">
                    <h3>{title}</h3>
                    <Typography
                      variant="body2"
                      component="small"
                      color="secondary"
                    >
                      {subTitle}
                    </Typography>
                  </div>
                  <ArrowForward color="primary" className="icon_arrow" />
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
