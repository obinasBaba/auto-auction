import React from 'react';
import s from './profileheaderinfo.module.scss';
import Image from 'next/image';
import Car1 from '@/public/car5.jpg';
import { Avatar, IconButton, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';
import clsx from 'clsx';

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
  const { data: session } = useSession();
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
            <Avatar
              className="avatar"
              sx={{ width: 80, height: 80 }}
              src={(index && session?.user?.image) || ''}
            />
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
            <h1>{title || session?.user?.name}</h1>
            <Typography>{subTitle || session?.user?.email}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderInfo;
