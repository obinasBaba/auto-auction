import React, { useLayoutEffect } from 'react';
import { Typography } from '@mui/material';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context';

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

  useLayoutEffect(() => {
    if (!currentUser) router.push('/');
  }, [currentUser, router]);

  if (!currentUser) return null;

  return (
    <div>
      <Typography variant="h1">DashBoard Content</Typography>
    </div>
  );
};

export default DashBoard;
