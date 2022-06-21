import React, { useLayoutEffect } from 'react';
import { Typography } from '@mui/material';
import { GetStaticPropsContext } from 'next';
import Router from 'next/router';

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
  useLayoutEffect(() => {
    Router.push('/?login=true');
  }, []);

  return null;

  return (
    <div>
      <Typography sx={{ backgroundColor: 'black' }} variant="h1">
        DashBoard Content
      </Typography>
    </div>
  );
};

export default DashBoard;
