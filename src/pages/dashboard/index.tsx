import React, { useLayoutEffect } from 'react';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context';
import AdminDashboard from '@/scenes/AdminDashboard';
import { Avatar, Box, Skeleton } from '@mui/material';
import s from './dashboard.module.scss';

export async function getStaticProps({}: GetStaticPropsContext<{
  slug: string;
}>) {
  // return {
  //   notFound: true,
  // };

  return {
    props: {
      dashBoard: true,
    },
    revalidate: 200,
  };
}

const DashBoard = () => {
  const { currentUser } = useAppContext();
  const router = useRouter();
  const { pathname } = useRouter();

  useLayoutEffect(() => {
    if (!currentUser) router.push('/');
  }, [currentUser, router, pathname]);

  if (!currentUser) return null;

  return (
    <div className={s.container}>
      {currentUser?.isAdmin ? (
        <AdminDashboard />
      ) : (
        <div className="grid">
          <div>
            <Skeleton width="100%" />
            <Skeleton
              sx={{ borderRadius: '10px' }}
              variant="rectangular"
              height={218}
              animation="wave"
            />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton width="60%" animation="wave" />
            </Box>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </div>

          <div>
            <Skeleton width="100%" />
            <Skeleton
              sx={{ borderRadius: '10px' }}
              variant="rectangular"
              height={218}
              animation="wave"
            />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton width="60%" />
            </Box>
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          </div>
          <div>
            <Skeleton width="100%" />
            <Skeleton
              sx={{ borderRadius: '10px' }}
              variant="rectangular"
              height={218}
              animation="wave"
            />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton width="60%" />
            </Box>
          </div>
          <div>
            <Skeleton width="100%" />
            <Skeleton
              sx={{ borderRadius: '10px' }}
              variant="rectangular"
              height={218}
              animation="wave"
            />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton width="60%" />
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
