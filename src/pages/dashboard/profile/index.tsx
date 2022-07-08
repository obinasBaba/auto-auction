import React from 'react';
import s from './profile.module.scss';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import Car1 from '@/public/car5.jpg';
import { Avatar, IconButton, Paper, Typography } from '@mui/material';
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
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export async function getStaticProps({}: GetStaticPropsContext<{
  slug: string;
}>) {
  // return {
  //   notFound: true,
  // };
  const acc = 'await prisma.user.findMany();';
  return {
    props: {
      acc,
    },
    revalidate: 200,
  };
}

const Profile = () => {
  const data = [
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

  const { data: session } = useSession();

  return (
    <div className={s.container}>
      <h1>Profile Settings</h1>

      <div className="blue_bg">
        <div className="bg_overlay"></div>
        <div className="car">
          <Image src={Car1} objectFit="cover" />
        </div>

        <div className="content">
          <Avatar
            className="avatar"
            sx={{ width: 80, height: 80 }}
            // src={session?.user?.image || ''}
          />
          <div className="name">
            <h1>{session?.user?.name}</h1>
            <Typography>{session?.user?.email}</Typography>
          </div>
        </div>
      </div>

      <div className="setting_list">
        {data.map(({ title, subTitle, Icon, link }) => (
          <Link href={`/dashboard/profile/${link}`} key={title}>
            <a>
              <div className="setting_card" key={title}>
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
