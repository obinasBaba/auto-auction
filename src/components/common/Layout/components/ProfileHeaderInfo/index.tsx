import React from 'react';
import s from './profileheaderinfo.module.scss';
import Image from 'next/image';
import Car1 from '@/public/car5.jpg';
import { Avatar, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import clsx from 'clsx';
import { useAppContext } from '@/context';

type HeaderInfo = {
  headerInfo: {
    title: string;
    subTitle: string;
    category: string;
    index: boolean;
  };
};

const ProfileHeaderInfo: React.FC<HeaderInfo> = ({
  headerInfo: { title, subTitle, index },
}: HeaderInfo) => {
  const { currentUser } = useAppContext();
  const { pathname } = useRouter();

  return (
    <div className={s.container}>
      <h1>Profile Settings</h1>

      <div className="blue_bg">
        <div className="bg_overlay"></div>
        <div className="car">
          <Image src={Car1} objectFit="cover" alt="Bg_overlay" />
        </div>

        <div className={clsx({ content: true, hor: !index })}>
          {index ? (
            <Avatar className="avatar" sx={{ width: 70, height: 70 }}>
              {currentUser?.email?.at(0).toUpperCase()}
            </Avatar>
          ) : (
            <Link href="/dashboard/profile">
              <a>
                <IconButton size="large">
                  <ArrowBack />
                </IconButton>
              </a>
            </Link>
          )}

          <div className="name">
            <h1>{currentUser?.email?.slice(0, 5)}</h1>
            <Typography>{currentUser?.email}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderInfo;
